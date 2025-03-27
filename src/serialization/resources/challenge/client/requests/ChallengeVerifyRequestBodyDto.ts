/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../index";
import * as ElsiKoraApi from "../../../../../api/index";
import * as core from "../../../../../core";

export const ChallengeVerifyRequestBodyDto: core.serialization.Schema<
    serializers.ChallengeVerifyRequestBodyDto.Raw,
    ElsiKoraApi.ChallengeVerifyRequestBodyDto
> = core.serialization.object({
    token: core.serialization.string(),
});

export declare namespace ChallengeVerifyRequestBodyDto {
    export interface Raw {
        token: string;
    }
}
