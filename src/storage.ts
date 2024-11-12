import { fetchPlayersByTeam, fetchTeams } from "./apiClient";
import { Player, Team } from "./objectTypes";

// Global objects to be used as caching data structures
const teamCache: Map<string, Team> = new Map();
const playerCache: Map<number, Player[]> = new Map();

/**
 * Fetches a team by name with caching support.
 * If the team data is already cached, it returns the cached team.
 * Otherwise, it fetches all teams from the API, caches them, and returns the requested team.
 *
 * @param {string} teamName - The name of the team to fetch.
 * @returns {Promise<Team | undefined>} - A promise that resolves to the `Team` object, or `undefined` if the team is not found.
 *
 * @example
 * const team = await fetchTeamWithCache("Golden State Warriors");
 */
export async function fetchTeamWithCache(teamName: string): Promise<Team | undefined> {
    if (teamCache.has(teamName)) {
        return teamCache.get(teamName);
    }

    const teams = await fetchTeams();
    teams.forEach(team => teamCache.set(team.full_name, team));

    return teamCache.get(teamName);
}

/**
 * Fetches players for a specific team by team ID with caching support.
 * If the player data for the team is cached, it returns the cached players.
 * Otherwise, it fetches the players from the API, caches them, and returns the result.
 *
 * @param {number} teamId - The ID of the team whose players are to be fetched.
 * @returns {Promise<Player[]>} - A promise that resolves to an array of `Player` objects.
 *
 * @example
 * const players = await fetchPlayersByTeamWithCache(1);
 */
export async function fetchPlayersByTeamWithCache(teamId: number): Promise<Player[]> {
    if (playerCache.has(teamId)) {
        return playerCache.get(teamId)!;
    }

    const players = await fetchPlayersByTeam(teamId);
    playerCache.set(teamId, players);
    return players;
}