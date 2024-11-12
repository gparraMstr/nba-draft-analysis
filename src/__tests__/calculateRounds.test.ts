import { countDraftRounds } from '../calculateRounds';
import { Player, Team } from '../objectTypes';

describe('countDraftRounds', () => {
    it('should count players drafted in round 1 and round 2', () => {
        const aTeam = {
            id: 1,
            full_name: "Golder Warriors",
            division: "West",
        } as Team;

        const players: Player[] = [
            {
                draft_round: 1,
                first_name: '',
                last_name: '',
                team: aTeam
            }, // Round 1
            {
                draft_round: 1,
                first_name: '',
                last_name: '',
                team: aTeam
            }, // Round 1
            {
                draft_round: 2,
                first_name: '',
                last_name: '',
                team: aTeam
            }, // Round 2
        ];

        const result = countDraftRounds(players);

        expect(result).toEqual({
            '1': 2,
            '2': 1,
        });
    });

    it('should count players with draft_round as null', () => {
        const aTeam = {
            id: 1,
            full_name: "Golder Warriors",
            division: "West",
        } as Team;

        const players: Player[] = [
            {
                draft_round: null,
                first_name: '',
                last_name: '',
                team: aTeam
            }, // No draft round
            {
                draft_round: 1,
                first_name: '',
                last_name: '',
                team: aTeam
            },
        ];

        const result = countDraftRounds(players);

        expect(result).toEqual({
            '1': 1,
            null: 1,
        });
    });

    it('should handle players with draft_round greater than 2 by counting them as null', () => {
        const aTeam = {
            id: 1,
            full_name: "Golder Warriors",
            division: "West",
        } as Team;

        const players: Player[] = [
            {
                draft_round: 3,
                first_name: '',
                last_name: '',
                team: aTeam
            },  // Round 3, should be counted as null
            {
                draft_round: null,
                first_name: '',
                last_name: '',
                team: aTeam
            },
            {
                draft_round: 1,
                first_name: '',
                last_name: '',
                team: aTeam
            },
        ];

        const result = countDraftRounds(players);

        expect(result).toEqual({
            '1': 1,
            null: 2,
        });
    });

    it('should return an empty record for an empty player list', () => {
        const players: Player[] = [];
        const result = countDraftRounds(players);

        expect(result).toEqual({});
    });
});