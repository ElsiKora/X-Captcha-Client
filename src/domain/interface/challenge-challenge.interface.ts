import type { ECaptchaType } from "../enum";

/**
 * Interface representing captcha challenge data
 */
export interface IChallenge {
	createdAt: Date;
	data?: object;
	id: string;
	isSolved?: boolean;
	token?: string;
	type: ECaptchaType;
	updatedAt?: Date;
}
