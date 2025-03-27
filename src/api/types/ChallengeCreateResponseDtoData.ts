/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as ElsiKoraApi from "../index";

/**
 * Challenge data
 */
export type ChallengeCreateResponseDtoData =
    | ElsiKoraApi.ChallengeCreateResponseDtoData.Click
    | ElsiKoraApi.ChallengeCreateResponseDtoData.Pow;

export namespace ChallengeCreateResponseDtoData {
    export interface Click extends ElsiKoraApi.ChallengeCreateResponseDataClickDto {
        type: "click";
    }

    export interface Pow extends ElsiKoraApi.ChallengeCreateResponseDataPowDto {
        type: "pow";
    }
}
