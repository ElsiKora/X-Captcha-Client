import type { ECaptchaType, IChallenge, IChallengeSolveRequest, IChallengeSolveResponse, IChallengeValidationRequest, IChallengeValidationResult } from "../../domain";
import type { IChallengeApiClient } from "../interface";

/**
 * Implementation of the challenge API client
 */
export class ChallengeApiClient implements IChallengeApiClient {
	private readonly PUBLIC_KEY: string;

	private readonly SECRET_KEY?: string;

	constructor(
		private readonly apiUrl: string,
		apiKeys: { publicKey: string; secretKey?: string },
	) {
		this.PUBLIC_KEY = apiKeys.publicKey;
		this.SECRET_KEY = apiKeys.secretKey;
	}

	/**
	 * Create a new captcha challenge
	 * @param {ECaptchaType} type - The type of challenge to create
	 * @returns {Promise<IChallenge>} The captcha challenge
	 */
	async createChallenge(type: ECaptchaType): Promise<IChallenge> {
		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const response: Response = await fetch(`${this.apiUrl}/v1/challenge`, {
			body: JSON.stringify({ type }),
			headers: {
				"Content-Type": "application/json",
				"X-Public-Key": this.PUBLIC_KEY,
			},
			method: "POST",
		});

		if (!response.ok) {
			throw new Error(`Failed to create challenge: ${response.statusText}`);
		}

		const data: IChallenge = (await response.json()) as IChallenge;

		return {
			...data,
			createdAt: new Date(data.createdAt),
			updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
		};
	}

	/**
	 * Solve a captcha challenge
	 * @param {string} challengeId - The challenge ID
	 * @param {IChallengeSolveRequest} request - The solve request
	 * @returns {Promise<IChallengeSolveResponse>} The solve response
	 */
	async solveChallenge(challengeId: string, request: IChallengeSolveRequest): Promise<IChallengeSolveResponse> {
		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const response: Response = await fetch(`${this.apiUrl}/v1/challenge/${challengeId}/solve`, {
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
				"X-Public-Key": this.PUBLIC_KEY,
			},
			method: "POST",
		});

		if (!response.ok) {
			throw new Error(`Failed to solve challenge: ${response.statusText}`);
		}

		return (await response.json()) as IChallengeSolveResponse;
	}

	/**
	 * Verify a captcha challenge token
	 * @param {IChallengeValidationRequest} request - The validation request
	 * @returns {Promise<IChallengeValidationResult>} The validation result
	 */
	async verifyChallenge(request: IChallengeValidationRequest): Promise<IChallengeValidationResult> {
		if (!this.SECRET_KEY) {
			throw new Error("Secret key is required for verifying a challenge");
		}

		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const response: Response = await fetch(`${this.apiUrl}/v1/challenge/verify`, {
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
				"X-Secret-Key": this.SECRET_KEY,
			},
			method: "POST",
		});

		if (!response.ok) {
			return {
				error: `Request failed: ${response.statusText}`,
				isSuccess: false,
			};
		}

		const result: { isSolved: boolean } = (await response.json()) as { isSolved: boolean };

		return {
			isSolved: result.isSolved,
			isSuccess: true,
		};
	}
}
