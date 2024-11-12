import { fetchPlayersByTeam, fetchTeams } from "./apiClient";
import { CACHE_EXPIRATION_MS } from "./constants";
import { Player, Team } from "./objectTypes";

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

/**
 * Saves data to Local Storage with an expiration timestamp.
 * This utility function allows for caching data in Local Storage with a defined expiration period.
 *
 * @param {string} key - The key under which the data will be stored.
 * @param {any} data - The data to store in Local Storage.
 *
 * @example
 * saveToLocalStorage("teamData", teamData);
 */
export function saveToLocalStorage(key: string, data: any) {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
}

/**
 * Loads data from Local Storage, checking if the cached data has expired.
 * If the data is expired, it removes the entry from Local Storage and returns `null`.
 *
 * @param {string} key - The key of the data to retrieve from Local Storage.
 * @returns {any | null} - The cached data if it exists and hasn't expired, or `null` if expired or missing.
 *
 * @example
 * const teamData = loadFromLocalStorage("teamData");
 */
export function loadFromLocalStorage(key: string) {
  const cacheItem = localStorage.getItem(key);
  if (!cacheItem) return null;

  const { data, timestamp } = JSON.parse(cacheItem);
  if (Date.now() - timestamp > CACHE_EXPIRATION_MS) {
    localStorage.removeItem(key); // Clear expired cache
    return null;
  }
  return data;
}