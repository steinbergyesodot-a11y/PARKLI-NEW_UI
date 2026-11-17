import type { Booking } from "../types/bookingTypes"

export function formatGameDate(value: string) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function isUpcoming(booking: Booking) {
    const gameDate = new Date(booking.gameDate)
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    return gameDate >= startOfToday
}