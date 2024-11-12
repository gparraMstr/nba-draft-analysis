import { BASE_URL, HEADERS } from "./constants";
import { Player, Team } from "./objectTypes";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";

/**
 * Fetches a list of teams with caching and error handling.
 * This function retrieves team data from the specified API endpoint, applying caching
 * for performance optimization and error handling to ensure stability.
 *
 * @returns {Promise<Team[]>} - A promise that resolves to an array of `Team` objects.
 * If an error occurs during fetching, the function logs the error and returns an empty array.
 *
 * @example
 * // Fetch teams and handle the returned data
 * const teams = await fetchTeams();
 *
 **/
export async function fetchTeams(): Promise<Team[]> {
  try {
    const response = await fetch(`${BASE_URL}/teams`, {
      method: "GET",
      headers: HEADERS,
    });
    if (!response.ok) throw new Error("Failed to fetch teams data");

    const data = await response.json();
    return data.data.filter((team: Team)  => team.division !== '');

  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

/**
 * Fetches a list of players by team ID with caching and error handling.
 * This function fetches players associated with a given team ID, supporting
 * pagination and caching for performance optimization.
 *
 * @param {number} teamId - The ID of the team whose players are being fetched.
 * @param {number} [pageSize=25] - The number of players to fetch per page (default is 25).
 * 
 * @returns {Promise<Player[]>} - A promise that resolves to an array of `Player` objects.
 * If an error occurs during fetching, it logs the error and returns an empty array.
 *
 * @example
 * // Fetch players for team ID 1 with default page size (25)
 * const players = await fetchPlayersByTeam(1);
 * 
 * // Fetch players for team ID 1 with a custom page size
 * const players = await fetchPlayersByTeam(1, 50);
 * 
 **/
export async function fetchPlayersByTeam(teamId: number, pageSize: number = 25): Promise<Player[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/players?team_ids[]=${teamId}&per_page=${pageSize}`,
      {
        method: "GET",
        headers: HEADERS,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch players data");

    const data = await response.json();
    return data.data as Player[];
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    return [];
  }
}