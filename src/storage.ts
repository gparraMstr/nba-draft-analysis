import { fetchPlayersByTeam, fetchTeams } from "./apiClient";
import { CACHE_EXPIRATION_MS } from "./constants";
import { Player, Team } from "./objectTypes";

const teamCache: Map<string, Team> = new Map();
const playerCache: Map<number, Player[]> = new Map();

export async function fetchTeamWithCache(teamName: string): Promise<Team | undefined> {
    if (teamCache.has(teamName)) {
        return teamCache.get(teamName);
    }

    const teams = await fetchTeams();
    teams.forEach(team => teamCache.set(team.full_name, team));

    return teamCache.get(teamName);
}

export async function fetchPlayersByTeamWithCache(teamId: number): Promise<Player[]> {
    if (playerCache.has(teamId)) {
        return playerCache.get(teamId)!;
    }

    const players = await fetchPlayersByTeam(teamId);
    playerCache.set(teamId, players);
    return players;
}

// Utility function: Save data to Local Storage with expiration
export function saveToLocalStorage(key: string, data: any) {
  const cacheItem = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheItem));
}

// Utility function: Load data from Local Storage, checking expiration
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