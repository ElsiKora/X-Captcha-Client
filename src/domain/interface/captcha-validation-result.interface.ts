/**
 * Interface representing captcha validation result
 */
export interface ICaptchaValidationResult {
	error?: string;
	isSuccess: boolean;
	token?: string;
}
