import { BASE_URL, HEADERS } from "./constants";
import { Player, Team } from "./objectTypes";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage";

// Fetch teams with caching and error handling
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

// Fetch players by team ID with caching and error handling
export async function fetchPlayersByTeam(teamId: number): Promise<Player[]> {
  const players: Player[] = [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/players?team_ids[]=${teamId}&per_page=25`,
      {
        method: "GET",
        headers: HEADERS,
      }
    );

    if (!response.ok) throw new Error("Failed to fetch players data");

    const data = await response.json();
    players.push(...data.data);

    return players;
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    return [];
  }
}