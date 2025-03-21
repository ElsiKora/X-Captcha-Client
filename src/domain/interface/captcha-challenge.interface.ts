/**
 * Interface representing captcha challenge data
 */
export interface ICaptchaChallenge {
	createdAt: Date;
	expiresAt: Date;
	id: string;
	type: string;
}
