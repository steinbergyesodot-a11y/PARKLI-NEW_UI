import { formatGameDate } from "../utils/utils";
import type { Booking } from "./../types/bookingTypes";

export function BookingCard({ booking }: { booking: Booking }) {
    return (
        <article className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle bg-surface-base px-5 py-4">
            <div className="min-w-0">
                <h3 className="font-semibold text-text-main">Cubs vs. {booking.visiting_team}</h3>
                <p className="mt-1 text-sm text-text-muted">
                    {formatGameDate(booking.gameDate)} &middot; Parking from {booking.parkingTime}
                </p>
                <p className="mt-1 truncate text-sm text-text-muted">{booking.address}</p>
            </div>
            <div className="shrink-0 text-right">
                <p className="text-lg font-semibold text-text-main">${booking.price}</p>
                <p className="mt-1 text-sm uppercase text-text-muted">#{booking._id.slice(-6)}</p>
            </div>
        </article>
    )
}