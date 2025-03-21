/**
 * Interface representing captcha validation request
 */
export interface ICaptchaValidationRequest {
	challengeId: string;
	response: boolean | string;
}
