import type { ICaptchaChallenge, ICaptchaService, ICaptchaValidationRequest, ICaptchaValidationResult } from "../domain";

import { CaptchaService } from "../application";
import { CaptchaApiClient } from "../infrastructure";

/**
 * Configuration options for the captcha client
 */
export interface ICaptchaClientConfig {
	apiUrl: string;
}

/**
 * Main class for the captcha client
 */
export class CaptchaClient {
	private readonly SERVICE: ICaptchaService;

	/**
	 * Create a new captcha client
	 * @param {ICaptchaClientConfig} config - Configuration for the client
	 */
	constructor(config: ICaptchaClientConfig) {
		const apiClient: CaptchaApiClient = new CaptchaApiClient(config.apiUrl);
		this.SERVICE = new CaptchaService(apiClient);
	}

	/**
	 * Get a new captcha challenge
	 * @returns {Promise<ICaptchaChallenge>} The captcha challenge
	 */
	async getChallenge(): Promise<ICaptchaChallenge> {
		return this.SERVICE.getChallenge();
	}

	/**
	 * Validate a captcha challenge response
	 * @param {ICaptchaValidationRequest} request - The validation request
	 * @returns {Promise<ICaptchaValidationResult>} The validation result
	 */
	async validate(request: ICaptchaValidationRequest): Promise<ICaptchaValidationResult> {
		return this.SERVICE.validateCaptcha(request);
	}
}
