/**
 * Interface representing captcha validation result
 */
export interface IChallengeValidationResult {
	error?: string;
	isSolved?: boolean;
	isSuccess: boolean;
}
