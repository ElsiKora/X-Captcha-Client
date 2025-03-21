import type { ICaptchaChallenge, ICaptchaValidationRequest, ICaptchaValidationResult } from "../../domain";
import type { ICaptchaApiClient } from "../interface";

/**
 * Implementation of the captcha API client
 */
export class CaptchaApiClient implements ICaptchaApiClient {
	constructor(private readonly apiUrl: string) {}

	/**
	 * Fetch a new captcha challenge from the server
	 * @returns {Promise<ICaptchaChallenge>} The captcha challenge
	 */
	async fetchChallenge(): Promise<ICaptchaChallenge> {
		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const response: Response = await fetch(`${this.apiUrl}/challenge`);

		if (!response.ok) {
			throw new Error(`Failed to fetch challenge: ${response.statusText}`);
		}

		const data: ICaptchaChallenge = (await response.json()) as ICaptchaChallenge;

		return {
			...data,
			createdAt: new Date(data.createdAt),
			expiresAt: new Date(data.expiresAt),
		};
	}

	/**
	 * Validate a captcha challenge response
	 * @param {ICaptchaValidationRequest} request - The validation request
	 * @returns {Promise<ICaptchaValidationResult>} The validation result
	 */
	async validateChallenge(request: ICaptchaValidationRequest): Promise<ICaptchaValidationResult> {
		// eslint-disable-next-line @elsikora/node/no-unsupported-features/node-builtins
		const response: Response = await fetch(`${this.apiUrl}/validate`, {
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});

		if (!response.ok) {
			return {
				error: `Request failed: ${response.statusText}`,
				isSuccess: false,
			};
		}

		return (await response.json()) as ICaptchaValidationResult;
	}
}
