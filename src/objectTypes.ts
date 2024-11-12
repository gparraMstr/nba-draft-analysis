export interface Team {
  id: number;
  full_name: string;
  division: string;
}

export interface Player {
  first_name: string;
  last_name: string;
  team: Team;
  draft_round: number | null;
}