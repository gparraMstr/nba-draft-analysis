/**
 * Represents a basketball team.
 * 
 * This interface defines the structure for team information, including
 * a unique identifier, the full name of the team, and its division.
 */
export interface Team {
  /**
   * The unique identifier for the team.
   * @type {number}
   */
  id: number;

  /**
   * The full name of the team (e.g., "Golden State Warriors").
   * @type {string}
   */
  full_name: string;

  /**
   * The division in which the team competes (e.g., "Pacific").
   * @type {string}
   */
  division: string;
}

/**
 * Represents a player in a basketball team.
 * 
 * This interface defines the structure for player information, including
 * the player's name, their associated team, and the draft round in which they were selected.
 */
export interface Player {
  /**
   * The first name of the player.
   * @type {string}
   */
  first_name: string;

  /**
   * The last name of the player.
   * @type {string}
   */
  last_name: string;

  /**
   * The team to which the player belongs.
   * This field uses the `Team` interface to store relevant team details.
   * @type {Team}
   */
  team: Team;

  /**
   * The draft round in which the player was selected.
   * If the player was not drafted, this value may be `null`.
   * @type {number | null}
   */
  draft_round: number | null;
}

export interface DraftResult {
  team_full_name: String;
  draft_count: Record<string, number>;
}