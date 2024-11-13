import { fetchTeams } from './apiClient';
import { countDraftRounds } from './calculateRounds';
import { DraftResult, Player, Team } from './objectTypes';
import { fetchPlayersByTeamWithCache, fetchTeamWithCache } from './storage';

/**
 * Performs draft analysis on a specified NBA team by team name.
 * This function fetches team and player data, filters by team name,
 * and returns the count of players drafted in each round.
 *
 * @param {string} teamName - The name of the team to analyze.
 * @returns {Promise<DraftResult>} - An object containing the team name and draft count by round.
 */
export async function performDraftAnalysisOnTeam(teamName: string): Promise<DraftResult | null> {
  // Fetch all teams and find the team that matches the specified name, ignoring case.
  const team = await fetchTeamWithCache(teamName);

  // If the team is not found, log an error and throw an exception to indicate failure.
  if (!team) {
    console.error("Team not found");
    return null;
  }

  // Fetch players associated with the found team, leveraging caching if available.
  const players: Player[] = await fetchPlayersByTeamWithCache(team.id);

  // Count the number of players drafted by round (e.g., round 1, round 2, etc.).
  const draftRounds = countDraftRounds(players);

  // Return an object containing the team's full name and a draft count by round.
  return { 
    team_full_name: team.full_name, // Ensure the output name matches the exact team name
    draft_count: draftRounds
  };
}

/**
 * Handles the change event for the HTML <select> element when a team is selected.
 * This function retrieves the selected team's players and calculates the count of
 * players by draft round, then displays the draft statistics in the HTML.
 *
 * @param {Event} event - The change event triggered by selecting a new team.
 *
 * @example
 * <select id="nba-teams" onchange="handleSelectChange(event)"></select>
 */
async function handleSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const team: Team = JSON.parse(target.value);

  // Fetch players and count draft rounds for the selected team
  const players: Player[] = await fetchPlayersByTeamWithCache(team.id);
  const draftRounds = countDraftRounds(players);

  // Display the team's draft statistics in the HTML output container
  displayTeamDraftStats(team, draftRounds);
}

/**
 * Initializes the HTML <select> element with NBA teams and sets up the
 * event listener for team selection changes. This function fetches all
 * available teams, populates the <select> element with them, and prepares
 * the element for interaction.
 *
 * @example
 * <select id="nba-teams"></select>
 */
async function initHTML() {
  const selectElement = document.getElementById('nba-teams') as HTMLSelectElement;

  if (selectElement) {
    selectElement.addEventListener("change", handleSelectChange);

    // Fetch teams and populate the <select> element with options
    const teams: Team[] = await fetchTeams();
    teams.forEach((team: Team) => {
      const option = document.createElement('option');
      option.value = JSON.stringify(team); // Store the team as JSON
      option.textContent = team.full_name; // Display team name

      selectElement.appendChild(option);
    });
  }
}

/**
 * Displays the selected team's draft statistics in a specified HTML container.
 * This function updates the content of the output container with the team name
 * and draft rounds information.
 *
 * @param {Team} team - The team object containing team information.
 * @param {Record<string, number>} draftRounds - An object mapping draft rounds
 *        to the count of players drafted in each round.
 *
 * @example
 * <div id="output"></div>
 * displayTeamDraftStats(team, draftRounds);
 */
function displayTeamDraftStats(team: Team, draftRounds: Record<string, number>) {
  const outputContainer = document.getElementById("output");
  if (outputContainer) {
    outputContainer.innerHTML = `
      <p>Team Name: ${team.full_name}</p>
      <p>Draft Rounds: ${JSON.stringify(draftRounds)}</p>
    `;
  }
}

/**
 * Main function that fetches and displays draft information for a specified team.
 * It checks for a team name passed as a command-line argument, fetches the team
 * data, retrieves the players for that team, and displays draft round counts.
 *
 * @example
 * // Run in a Node.js environment
 * node index.js "Golden State Warriors"
 */
async function main() {
  let teamName = "Golden State Warriors"; // Default team name

  // Check if a team name was passed as an argument
  if (process.argv && process.argv.length > 2) {
    const args = process.argv.slice(2);
    teamName = args[0];
  }

  const results = await performDraftAnalysisOnTeam(teamName);
  
  if (results) {
    console.log(`Team Name: ${results.team_full_name}`);
    console.log('Draft Rounds:', results.draft_count);
  }
}

// Run the script in Node.js or in a browser environment
if (typeof process !== 'undefined' && typeof process.argv !== 'undefined') {
  main().catch(console.error);
}

// Run on CodePen for HTML test/validation
if (typeof document !== 'undefined') {
  initHTML();
}