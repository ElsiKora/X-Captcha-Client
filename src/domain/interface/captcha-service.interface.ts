import type { ICaptchaChallenge, ICaptchaValidationRequest, ICaptchaValidationResult } from "./captcha.interface";

/**
 * Interface for captcha service
 */
export interface ICaptchaService {
	/**
	 * Get a new captcha challenge
	 */
	getChallenge(): Promise<ICaptchaChallenge>;

	/**
	 * Validate captcha response
	 * @param validationRequest - The validation request
	 */
	validateCaptcha(validationRequest: ICaptchaValidationRequest): Promise<ICaptchaValidationResult>;
}
