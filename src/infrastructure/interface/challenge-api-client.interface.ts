import type { ECaptchaType, IChallenge, IChallengeSolveRequest, IChallengeSolveResponse, IChallengeValidationRequest, IChallengeValidationResult } from "../../domain";

/**
 * Interface for challenge API client
 */
export interface IChallengeApiClient {
	/**
	 * Create a new captcha challenge
	 * @param type - The type of challenge to create
	 */
	createChallenge(type: ECaptchaType): Promise<IChallenge>;

	/**
	 * Solve a captcha challenge
	 * @param challengeId - The challenge ID
	 * @param request - The solve request
	 */
	solveChallenge(challengeId: string, request: IChallengeSolveRequest): Promise<IChallengeSolveResponse>;

	/**
	 * Verify a captcha challenge token
	 * @param request - The validation request
	 */
	verifyChallenge(request: IChallengeValidationRequest): Promise<IChallengeValidationResult>;
}
