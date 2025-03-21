import type { ICaptchaChallenge, ICaptchaValidationRequest, ICaptchaValidationResult } from "../../domain";

/**
 * Interface for captcha API client
 */
export interface ICaptchaApiClient {
	/**
	 * Fetch a new captcha challenge from the server
	 */
	fetchChallenge(): Promise<ICaptchaChallenge>;

	/**
	 * Validate a captcha challenge response
	 * @param request - The validation request
	 */
	validateChallenge(request: ICaptchaValidationRequest): Promise<ICaptchaValidationResult>;
}
