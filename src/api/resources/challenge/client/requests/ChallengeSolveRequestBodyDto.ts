/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as ElsiKoraApi from "../../../../index";

/**
 * @example
 *     {
 *         solution: {
 *             type: "click",
 *             data: true
 *         }
 *     }
 */
export interface ChallengeSolveRequestBodyDto {
    /** Challenge solution */
    solution: ElsiKoraApi.ChallengeSolveRequestBodyDtoSolution;
}
