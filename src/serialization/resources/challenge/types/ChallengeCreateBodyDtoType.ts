/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as ElsiKoraApi from "../../../../api/index";
import * as core from "../../../../core";

export const ChallengeCreateBodyDtoType: core.serialization.Schema<
    serializers.ChallengeCreateBodyDtoType.Raw,
    ElsiKoraApi.ChallengeCreateBodyDtoType
> = core.serialization.enum_(["click", "pow"]);

export declare namespace ChallengeCreateBodyDtoType {
    export type Raw = "click" | "pow";
}
