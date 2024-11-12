import { Player } from "./objectTypes";

/**
 * Counts the number of players drafted in each round.
 * This function processes an array of `Player` objects and aggregates the count of players
 * by draft round. Only 1st and 2nd rounds are counted by their actual round numbers, 
 * while other rounds or `null` values are grouped under `"null"`.
 *
 * @param {Player[]} players - An array of `Player` objects to be analyzed.
 * 
 * @returns {Record<string, number>} - A record object with keys representing draft rounds 
 * (`"1"`, `"2"`, or `"null"`) and values representing the count of players drafted in each round.
 *
 * @example
 * // Example usage of countDraftRounds
 * const players: Player[] = [
 *   { draft_round: 1 },
 *   { draft_round: 2 },
 *   { draft_round: null },
 *   { draft_round: 3 }
 * ];
 * 
 * const draftCounts = countDraftRounds(players);
 * console.log(draftCounts); // Output: { "1": 1, "2": 1, "null": 2 }
 *
 */
export function countDraftRounds(players: Player[]): Record<string, number> {
  return players.reduce((acc, player) => {
    // Aggregate only 1st and 2nd rounds, others as "null"
    const round = player.draft_round !== null && player.draft_round < 3
      ? player.draft_round.toString()
      : "null";

    acc[round] = (acc[round] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}