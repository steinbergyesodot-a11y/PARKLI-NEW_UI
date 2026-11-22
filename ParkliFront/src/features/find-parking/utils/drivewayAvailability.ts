import type { IGame } from "../components/DrivewayCard";

function calendarDate(value: string): string | null {
    const match = /^(\d{4}-\d{2}-\d{2})/.exec(value);
    return match?.[1] ?? null;
}

export function rankDrivewaysByAvailability<T extends { games: IGame[] }>(
    driveways: T[],
    selectedDate: string | null,
): { driveway: T; isAvailable: boolean | null }[] {
    const ranked = driveways.map((driveway) => {
        if (!selectedDate) return { driveway, isAvailable: null };

        const matchingGames = driveway.games.filter((game) => calendarDate(game.date) === selectedDate);
        return {
            driveway,
            isAvailable: matchingGames.length > 0 && matchingGames.every((game) => !game.booked && !game.blocked),
        };
    });

    if (selectedDate) {
        ranked.sort((first, second) => Number(second.isAvailable) - Number(first.isAvailable));
    }

    return ranked;
}
