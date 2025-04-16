import { createHash } from "crypto";
import type { IPowChallengeData } from "../../domain";

/**
 * Class for solving Proof of Work challenges
 */
export class PowSolver {
  /**
   * Solve a PoW challenge by finding a nonce that produces a hash with the required number of leading zeros
   * @param {IPowChallengeData} challengeData - The challenge data containing prefix and difficulty
   * @returns {Promise<string>} The solution (nonce) that satisfies the challenge
   */
  static async solve(challengeData: IPowChallengeData): Promise<string> {
    const { prefix, difficulty } = challengeData;
    const target = "0".repeat(difficulty);
    
    let nonce = 0;
    let hash = "";
    
    // For UX reasons, we'll limit the number of attempts and also provide status updates
    const maxAttempts = 100000;
    const statusUpdateInterval = 1000;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const input = `${prefix}${nonce}`;
      hash = createHash("sha256").update(input).digest("hex");
      
      if (hash.startsWith(target)) {
        return nonce.toString();
      }
      
      nonce++;
      
      // Every 1000 attempts, yield to the event loop to prevent blocking
      if (attempt % statusUpdateInterval === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    throw new Error(`Failed to solve PoW challenge after ${maxAttempts} attempts`);
  }
}