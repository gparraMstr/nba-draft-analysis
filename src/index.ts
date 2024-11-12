import { fetchTeams, fetchPlayersByTeam } from './apiClient';
import { countDraftRounds } from './calculateRounds';
import { Player, Team } from './objectTypes';
import { fetchPlayersByTeamWithCache } from './storage';

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

  // Fetch teams and find the requested team by name
  const teams: Team[] = await fetchTeams();
  const team = teams.find((t: Team) => t.full_name.toLowerCase() === teamName.toLowerCase()) as Team;

  if (!team) {
    console.error("Team not found");
    return;
  }

  // Fetch players and count draft rounds for the selected team
  const players: Player[] = await fetchPlayersByTeamWithCache(team.id);
  const draftRounds = countDraftRounds(players);

  console.log(`Team Name: ${team.full_name}`);
  console.log('Draft Rounds:', draftRounds);
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

// Run the script in Node.js or in a browser environment
if (typeof process !== 'undefined' && typeof process.argv !== 'undefined') {
  main().catch(console.error);
}

if (typeof document !== 'undefined') {
  initHTML();
}