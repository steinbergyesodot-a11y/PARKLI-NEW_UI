interface GameScheduleParams {
  startDate?: string; // Format: "YYYY-MM-DD"
  endDate?: string;   // Format: "YYYY-MM-DD"
  season?: string;    // Format: "2026"
}

export interface CubsHomeGame {
  gamePk: number;
  gameDate: string;
  status: { startTimeTBD?: boolean };
  teams: {
    home: { team: { id: number; name: string } };
    away: { team: { id: number; name: string } };
  };
}

export async function fetchCubsHomeGames({ startDate, endDate, season = "2026" }: GameScheduleParams = {}): Promise<CubsHomeGame[]> {
  const cubsTeamId = 112; // Chicago Cubs Team ID
  let url = `https://statsapi.mlb.com/api/v1/schedule?teamId=${cubsTeamId}&season=${season}&sportId=1`;

  if (startDate) url += `&startDate=${startDate}`;
  if (endDate) url += `&endDate=${endDate}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch MLB schedule: ${response.statusText}`);
    }

    const data: { dates?: { games: CubsHomeGame[] }[] } = await response.json();
    
    // 1. Flatten all games from the dates array
    const allGames = data.dates ? data.dates.flatMap((dateGroup) => dateGroup.games) : [];
    
    // 2. Filter to keep ONLY games where the Cubs are the home team
    const homeGames = allGames.filter((game) => game.teams.home.team.id === cubsTeamId);
    
    return homeGames;
  } catch (error) {
    console.error("Error fetching Cubs home games:", error);
    return [];
  }
}