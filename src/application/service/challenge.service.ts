import type { IChallengeSolveRequest, IChallengeSolveResponse } from "../../domain";
import type { IChallengeService } from "../../domain";
import type { IChallenge } from "../../domain";
import type { ECaptchaType } from "../../domain/enum";
import type { IChallengeApiClient } from "../../infrastructure";

/**
 * Implementation of the captcha service
 */
export class ChallengeService implements IChallengeService {
	constructor(private readonly apiClient: IChallengeApiClient) {}

	/**
	 * Create a new captcha challenge
	 * @param {ECaptchaType} type - The type of challenge to create
	 * @returns {Promise<IChallenge>} The captcha challenge
	 */
	async createChallenge(type: ECaptchaType): Promise<IChallenge> {
		return this.apiClient.createChallenge(type);
	}

	/**
	 * Solve a captcha challenge
	 * @param {string} challengeId - The challenge ID
	 * @param {string} solution - The solution to the challenge
	 * @returns {Promise<IChallengeSolveResponse>} The solve response
	 */
	async solveChallenge(challengeId: string, solution: string): Promise<IChallengeSolveResponse> {
		const request: IChallengeSolveRequest = {
			solution,
		};

		return this.apiClient.solveChallenge(challengeId, request);
	}
}
