import { Player } from "./objectTypes";

// Count players by draft round
export function countDraftRounds(players: Player[]): Record<string, number> {
  return players.reduce((acc, player) => {
    const round =
      player["draft_round"] !== null && player["draft_round"] < 3
        ? player["draft_round"]
        : "null";
    acc[round] = (acc[round] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}