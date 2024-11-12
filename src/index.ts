import { fetchTeams, fetchPlayersByTeam } from './apiClient';
import { countDraftRounds } from './calculateRounds';
import { Player, Team } from './objectTypes';
import { fetchPlayersByTeamWithCache } from './storage';

async function main() {
  // Default team name
  let teamName = "Golden State Warriors";

  // Check if a team name was passed as an argument
  if (process.argv && process.argv.length > 2) {
    const args = process.argv.slice(2);
    teamName = args[0];
  }

  // Fetch teams and find the requested team
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

// Handle the change event for the HTML <select> element
async function handleSelectChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const team: Team = JSON.parse(target.value);

  // Fetch players and count draft rounds for the selected team
  const players: Player[]  = await fetchPlayersByTeamWithCache(team.id);
  const draftRounds = countDraftRounds(players);

  // Display the team's draft statistics in the HTML output container
  displayTeamDraftStats(team, draftRounds);
}

// Initialize the HTML <select> element with NBA teams
async function initHTML() {
  // Get the <select> element
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

// Display team and draft statistics in the HTML output container
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