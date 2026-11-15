import { useEffect, useState } from "react"
import type { IconType } from "react-icons"
import { FiCalendar, FiClipboard, FiEdit2, FiMapPin, FiRotateCcw } from "react-icons/fi"
import clsx from "clsx"
import { useAuth } from "../../../context/AuthContext"
import { profileService } from "../services/profileService"
import { BookingCard } from "./BookingCard"
import { OwnerGamesList } from "./OwnerGamesList"
import type { Booking } from "../types/bookingTypes"
import { isUpcoming } from "../utils/utils"
import { findParkingService } from "../../find-parking/services/findParking"
import type { Driveway } from "../../find-parking/hooks/useFindParking"


type ProfileTab = "upcoming" | "history" | "driveway" | "games" | "ownerBookings"
type PreviewRole = "owner" | "renter"

const TABS_BY_ROLE: Record<PreviewRole, { id: ProfileTab; label: string; icon: IconType }[]> = {
    renter: [
        { id: "upcoming", label: "Upcoming bookings", icon: FiCalendar },
        { id: "history", label: "Booking history", icon: FiRotateCcw },
    ],
    owner: [
        { id: "driveway", label: "My driveway", icon: FiMapPin },
        { id: "games", label: "Games", icon: FiCalendar },
        { id: "ownerBookings", label: "Bookings", icon: FiClipboard },
    ],
}

const ROLES: { id: PreviewRole; label: string }[] = [
    { id: "owner", label: "Driveway owner" },
    { id: "renter", label: "Renter" },
]

export function ProfileMain() {
    const { user } = useAuth()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [userDriveways,setUserDriveways] = useState<Driveway[]>([])
    const [bookingsLoading, setBookingsLoading] = useState(true)
    const [bookingsError, setBookingsError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<ProfileTab>("upcoming")
    const [previewRole, setPreviewRole] = useState<PreviewRole>("renter")

    useEffect(() => {
        if (!user?._id) return

        // Ignore responses that arrive after the user changes or the component unmounts
        let ignore = false

        profileService
            .getAllBookinsByRenterId(user._id)
            .then((data) => {
                if (ignore) return
                setBookings(Array.isArray(data) ? data : data?.data ?? [])
                setBookingsError(null)
            })
            .catch(() => {
                if (!ignore) setBookingsError("Unable to load your bookings.")
            })
            .finally(() => {
                if (!ignore) setBookingsLoading(false)
            })

        return () => {
            ignore = true
        }
    }, [user?._id])

      useEffect(() => {
        if (!user?._id) return

        // Ignore responses that arrive after the user changes or the component unmounts
        let ignore = false

        findParkingService
            .getAllDrivewaysByUserId(user._id)
            .then((data) => {
                if (ignore) return
                setUserDriveways(Array.isArray(data) ? data : data?.data ?? [])
            })
            .catch(() => {
            })
            .finally(() => {
                // if (!ignore) setBookingsLoading(false)
            })

        return () => {
            ignore = true
        }
    }, [user?._id])

    const firstDriveway = userDriveways[0]

    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || ""
    const initials =
        ((user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "")).toUpperCase() ||
        (user?.email?.[0] ?? "?").toUpperCase()

    const visibleBookings = bookings
        .filter((booking) => (activeTab === "upcoming" ? isUpcoming(booking) : !isUpcoming(booking)))
        .sort((a, b) => {
            const diff = new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime()
            return activeTab === "upcoming" ? diff : -diff
        })
    const tabs = TABS_BY_ROLE[previewRole]
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label
    const isDrivewayTab = previewRole === "owner" && activeTab === "driveway"
    const isGamesTab = previewRole === "owner" && activeTab === "games"

    function handleRoleChange(role: PreviewRole) {
        setPreviewRole(role)
        setActiveTab(TABS_BY_ROLE[role][0].id)
    }

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 md:flex-row md:items-start">
            <aside className="w-full shrink-0 rounded-2xl border border-border-subtle bg-surface-base p-8 shadow-sm md:max-w-sm">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xl font-semibold text-brand-500">
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-lg font-semibold text-text-main">{fullName}</p>
                        <p className="truncate text-sm text-text-muted">{user?.email}</p>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-subtle px-4 py-3 text-sm font-medium text-text-main shadow-sm transition hover:bg-gray-100"
                >
                    <FiEdit2 className="h-4 w-4" />
                    Edit profile info
                </button>

                <hr className="my-5 border-border-subtle" />

                <nav className="flex flex-col gap-1">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={clsx(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-base transition",
                                activeTab === id
                                    ? "bg-brand-50 font-semibold text-brand-500"
                                    : "text-text-muted hover:bg-surface-subtle"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {label}
                        </button>
                    ))}
                </nav>

                <hr className="my-5 border-border-subtle" />

                <p className="text-sm text-text-muted">Preview as</p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {ROLES.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => handleRoleChange(id)}
                            className={clsx(
                                "rounded-full border px-5 py-3 text-sm transition",
                                previewRole === id
                                    ? "border-brand-500 bg-brand-50 font-semibold text-brand-500"
                                    : "border-border-subtle bg-surface-base text-text-main hover:bg-surface-subtle"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </aside>

            <section className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-4xl font-semibold text-text-main">{isGamesTab ? "Game dates" : activeTabLabel}</h1>
                    {isDrivewayTab && firstDriveway && (
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-base px-5 py-3 text-sm font-medium text-text-main shadow-sm transition hover:bg-surface-subtle"
                        >
                            <FiEdit2 className="h-4 w-4" />
                            Edit listing
                        </button>
                    )}
                </div>
                {isGamesTab && (
                    <p className="mt-3 text-text-muted">
                        Block a date to stop new bookings. Dates a fan already booked can’t be changed here.
                    </p>
                )}

                <div className="mt-8 flex flex-col gap-4">
                    {isGamesTab ? (
                        firstDriveway ? (
                            <OwnerGamesList
                                key={firstDriveway._id}
                                games={firstDriveway.games ?? []}
                                price={firstDriveway.price}
                            />
                        ) : (
                            <p className="text-text-muted">Nothing to show here yet.</p>
                        )
                    ) : isDrivewayTab ? (
                        firstDriveway ? (
                            <div className="rounded-2xl border border-border-subtle bg-surface-base p-8 shadow-sm">
                                {firstDriveway.images?.[0] && (
                                    <img
                                        src={firstDriveway.images[0]}
                                        alt={firstDriveway.name}
                                        className="aspect-[16/9] w-full rounded-xl object-cover"
                                    />
                                )}
                                <h2 className="mt-6 text-xl font-semibold text-text-main">{firstDriveway.name}</h2>
                                <p className="mt-2 text-text-muted">
                                    {[
                                        firstDriveway.address,
                                        firstDriveway.walk != null ? `${firstDriveway.walk} min walk` : null,
                                        firstDriveway.price != null ? `$${firstDriveway.price} per game` : null,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </p>
                                {firstDriveway.rules?.length > 0 && (
                                    <div className="mt-6 rounded-xl border border-border-subtle bg-surface-subtle px-5 py-4">
                                        <p className="text-sm text-text-muted">Your notes to guests</p>
                                        <p className="mt-1 text-text-main">{firstDriveway.rules.join(" ")}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-text-muted">Nothing to show here yet.</p>
                        )
                    ) : bookingsLoading ? (
                        <p role="status" className="text-text-muted">Loading your bookings...</p>
                    ) : bookingsError ? (
                        <p role="alert" className="text-danger">{bookingsError}</p>
                    ) : visibleBookings.length === 0 ? (
                        <p className="text-text-muted">
                            {activeTab === "upcoming" ? "You have no upcoming bookings." : "You have no past bookings."}
                        </p>
                    ) : (
                        visibleBookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)
                    )}
                </div>
            </section>
        </div>
    )
}