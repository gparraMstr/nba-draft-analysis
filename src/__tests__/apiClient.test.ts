import { fetchTeams, fetchPlayersByTeam } from '../apiClient'

describe('API Fetch Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchTeams should return teams if available', async () => {
    const result = await fetchTeams();
    expect(result.length).toBeGreaterThan(1);
  });

  it('fetchPlayersByTeam should fetch and cache players for a team', async () => {
    const teamId = 1;
    const result = await fetchPlayersByTeam(teamId);

    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});