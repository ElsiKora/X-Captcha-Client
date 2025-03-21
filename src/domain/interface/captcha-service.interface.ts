import type { ICaptchaChallenge } from "./captcha-challenge.interface";
import type { ICaptchaValidationRequest } from "./captcha-validation-request.interface";
import type { ICaptchaValidationResult } from "./captcha-validation-result.interface";

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
