import type { ECaptchaType } from "../enum";

import type { IChallenge } from "./challenge-challenge.interface";
import type { IChallengeSolveResponse } from "./challenge-solve-response.interface";
import type { IChallengeValidationResult } from "./challenge-validation-result.interface";

/**
 * Interface for captcha service
 */
export interface IChallengeService {
	/**
	 * Create a new captcha challenge
	 * @param {ECaptchaType} type - The type of challenge to create
	 * @returns {Promise<IChallenge>} - The created challenge
	 */
	createChallenge(type: ECaptchaType): Promise<IChallenge>;

	/**
	 * Solve a captcha challenge
	 * @param {string} challengeId - The challenge ID
	 * @param {string} solution - The solution to the challenge
	 */
	solveChallenge(challengeId: string, solution: string): Promise<IChallengeSolveResponse>;

	/**
	 * Verify a captcha challenge token
	 * @param {string} token - The validation token
	 */
	verifyChallenge(token: string): Promise<IChallengeValidationResult>;
}
