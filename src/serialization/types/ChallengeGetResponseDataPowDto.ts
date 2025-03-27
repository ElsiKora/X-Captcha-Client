/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as ElsiKoraApi from "../../api/index";
import * as core from "../../core";

export const ChallengeGetResponseDataPowDto: core.serialization.ObjectSchema<
    serializers.ChallengeGetResponseDataPowDto.Raw,
    ElsiKoraApi.ChallengeGetResponseDataPowDto
> = core.serialization.object({
    challenge: core.serialization.string().optional(),
    difficulty: core.serialization.number().optional(),
});

export declare namespace ChallengeGetResponseDataPowDto {
    export interface Raw {
        challenge?: string | null;
        difficulty?: number | null;
    }
}
