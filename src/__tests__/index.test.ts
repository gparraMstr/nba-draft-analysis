import { performDraftAnalysisOnTeam } from '../index';


describe('performDraftAnalysisOnTeam', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore(); // Restore console.error to its original implementation
  });

  it('should return draft results when team is found', async () => {
    // Arrange: Mock team and player data
    const mockDraftResult: Record<string, number> = { '1': 13, '2': 7, 'null': 5 };

    // Act: Call the function
    const result = await performDraftAnalysisOnTeam('Golden State Warriors');

    // Assert: Verify the output matches expected draft result
    expect(result).toEqual({
      team_full_name: 'Golden State Warriors',
      draft_count: mockDraftResult,
    });
  });

  it('should log an error and return null when the team is not found', async () => {
    
    // Act: Call the function and await its completion
    const result = await performDraftAnalysisOnTeam('Nonexistent Team');

    // Assert: Expect null and check if console.error was called with the expected message
    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Team not found');
  });
});