import type { ICaptchaChallenge, ICaptchaService, ICaptchaValidationRequest, ICaptchaValidationResult } from "../../domain";
import type { ICaptchaApiClient } from "../../infrastructure";

/**
 * Implementation of the captcha service
 */
export class CaptchaService implements ICaptchaService {
	constructor(private readonly apiClient: ICaptchaApiClient) {}

	/**
	 * Get a new captcha challenge
	 * @returns {Promise<ICaptchaChallenge>} The captcha challenge
	 */
	async getChallenge(): Promise<ICaptchaChallenge> {
		return this.apiClient.fetchChallenge();
	}

	/**
	 * Validate captcha response
	 * @param {ICaptchaValidationRequest} validationRequest - The validation request
	 * @returns {Promise<ICaptchaValidationResult>} The validation result
	 */
	async validateCaptcha(validationRequest: ICaptchaValidationRequest): Promise<ICaptchaValidationResult> {
		return this.apiClient.validateChallenge(validationRequest);
	}
}
