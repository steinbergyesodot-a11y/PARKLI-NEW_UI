import { useState } from "react"
import clsx from "clsx"
import { FiSlash, FiUnlock } from "react-icons/fi"
import type { IGame } from "../../find-parking/components/DrivewayCard"
import type { Driveway } from "../../find-parking/hooks/useFindParking"
import { profileService } from "../services/profileService"

interface OwnerGamesListProps {
    driveway: Driveway
    games: IGame[]
    price: number
}

function formatGameDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        timeZone: "UTC",
        weekday: "short",
        month: "short",
        day: "numeric",
    })
}

export function OwnerGamesList({ driveway, games, price }: OwnerGamesListProps) {
    const [gameList, setGameList] = useState(games)
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())
    const [error, setError] = useState<string | null>(null)

    async function toggleBlocked(game: IGame) {
        setPendingIds((prev) => new Set(prev).add(game._id))
        setError(null)
        try {
            await profileService.blockGame(driveway._id, game.date)
            setGameList((prev) =>
                prev.map((item) => item._id === game._id ? { ...item, blocked: !item.blocked } : item)
            )
        } catch {
            setError("Unable to update this game date. Please try again.")
        } finally {
            setPendingIds((prev) => {
                const next = new Set(prev)
                next.delete(game._id)
                return next
            })
        }
    }

    if (gameList.length === 0) {
        return <p className="text-text-muted">No game dates for this driveway yet.</p>
    }

    const sortedGames = [...gameList].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <>
        {error && <p role="alert" className="text-sm text-danger">{error}</p>}
        <ul className="flex flex-col gap-4">
            {sortedGames.map((game) => {
                const isBlocked = game.blocked
                const status = game.booked ? "booked" : isBlocked ? "blocked" : "open"

                return (
                    <li
                        key={game._id}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-base p-5 shadow-sm"
                    >
                        <div className="flex min-w-0 flex-col gap-2">
                            <p className="truncate text-lg font-semibold text-text-main">Cubs vs. {game.visiting_team}</p>
                            <p className="text-sm text-text-muted">
                                {formatGameDate(game.date)} · {game.game_time}
                            </p>
                            <span
                                className={clsx(
                                    "inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-sm font-semibold",
                                    status === "open" && "bg-border-subtle text-primary",
                                    status === "booked" && "bg-danger-subtle text-danger",
                                    status === "blocked" && "bg-surface-subtle text-text-muted"
                                )}
                            >
                                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
                                {status === "open" ? "Open for booking" : status === "booked" ? "Booked" : "Blocked"}
                            </span>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-3">
                            <p className="text-lg font-semibold text-text-main">${price}</p>
                            {!game.booked && (
                                <button
                                    type="button"
                                    onClick={() => void toggleBlocked(game)}
                                    disabled={pendingIds.has(game._id)}
                                    className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-base px-4 py-2.5 text-sm font-medium text-text-main shadow-sm transition hover:bg-surface-subtle"
                                >
                                    {isBlocked ? <FiUnlock className="h-4 w-4" /> : <FiSlash className="h-4 w-4" />}
                                    {isBlocked ? "Unblock" : "Block"}
                                </button>
                            )}
                        </div>
                    </li>
                )
            })}
        </ul>
        </>
    )
}
