import type { ECaptchaType } from "../enum";

/**
 * Interface representing captcha challenge data
 */
export interface ICaptchaChallenge {
	createdAt: Date;
	expiresAt: Date;
	id: string;
	type: ECaptchaType;
}
