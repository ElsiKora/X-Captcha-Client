import type { ECaptchaType, IChallenge, IChallengeService, IChallengeSolveResponse, IChallengeValidationResult } from "../domain";

import { ChallengeService } from "../application/service/challenge.service";
import { ChallengeApiClient } from "../infrastructure";

/**
 * Configuration options for the captcha client
 */
export interface ICaptchaClientConfig {
	apiUrl: string;
	publicKey: string;
	secretKey?: string;
}

/**
 * Main class for the captcha client
 */
export class CaptchaClient {
	private readonly SERVICE: IChallengeService;

	/**
	 * Create a new captcha client
	 * @param {ICaptchaClientConfig} config - Configuration for the client
	 */
	constructor(config: ICaptchaClientConfig) {
		const apiClient: ChallengeApiClient = new ChallengeApiClient(config.apiUrl, {
			publicKey: config.publicKey,
			secretKey: config.secretKey,
		});
		this.SERVICE = new ChallengeService(apiClient);
	}

	/**
	 * Create a new captcha challenge
	 * @param {ECaptchaType} type - The type of challenge to create
	 * @returns {Promise<IChallenge>} The captcha challenge
	 */
	async createChallenge(type: ECaptchaType): Promise<IChallenge> {
		return this.SERVICE.createChallenge(type);
	}

	/**
	 * Solve a captcha challenge
	 * @param {string} challengeId - The challenge ID
	 * @param {string} solution - The solution to the challenge
	 * @returns {Promise<IChallengeSolveResponse>} The solve response
	 */
	async solveChallenge(challengeId: string, solution: string): Promise<IChallengeSolveResponse> {
		return this.SERVICE.solveChallenge(challengeId, solution);
	}

	/**
	 * Verify a captcha challenge token
	 * @param {string} token - The validation token
	 * @returns {Promise<IChallengeValidationResult>} The validation result
	 */
	async verifyChallenge(token: string): Promise<IChallengeValidationResult> {
		return this.SERVICE.verifyChallenge(token);
	}
}
