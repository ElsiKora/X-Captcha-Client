/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../index";
import * as ElsiKoraApi from "../../api/index";
import * as core from "../../core";

export const ChallengeGetRequestDto: core.serialization.ObjectSchema<
    serializers.ChallengeGetRequestDto.Raw,
    ElsiKoraApi.ChallengeGetRequestDto
> = core.serialization.object({
    id: core.serialization.string(),
});

export declare namespace ChallengeGetRequestDto {
    export interface Raw {
        id: string;
    }
}
