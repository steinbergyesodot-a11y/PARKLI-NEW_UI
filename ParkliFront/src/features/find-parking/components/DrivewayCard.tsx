import { useId, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { Card, CardDescription, CardHeader, CardTitle } from "../../../components/primitives/Card";
import { Modal } from "../../../components/primitives/Modal";
import { FaStar } from "react-icons/fa";
import Button from "../../../components/primitives/Button";
import { CiCalendar } from "react-icons/ci";
import { IoArrowForward, IoInformationCircleOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { Select } from "../../../components/primitives/Select";

const monthOptions = [
    { value: "", label: "All months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];
export interface IGame {
    _id: string;
  visiting_team: string;
  game_time: string,
  parkingBegins: string;
  date: string;
  booked: boolean;
  blocked: boolean;
}
interface DrivewayCardProps {
    drivewayId: string
    drivewayImage: string
    drivewayName: string
    drivewayAddress: string
    walkMin: number
    price: number
    drivewayImages?: string[]
    stadium?: string
    rules: string []
    publicDisplay?: string
    postedAt?: string
    view?: "list" | "grid"
    games: IGame[]
}  

export function DrivewayCard({ drivewayImage, drivewayImages = [], drivewayName, drivewayAddress, walkMin, price, stadium,rules, postedAt, view = "list", games = [] }: DrivewayCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTab, setModalTab] = useState<"details" | "games">("details");
    const [selectedMonth, setSelectedMonth] = useState("");
    const cancellationTooltipId = useId();

    const filteredGames = games.filter((game) => (
        selectedMonth === "" || String(Number(game.date.split("-")[1])) === selectedMonth
    ));

    return(
        <>
        <Card className="h-auto w-full cursor-pointer border border-brand-100" onClick={() => setIsOpen(true)}>
             <div className={`flex gap-3 p-3 ${view === "grid" ? "flex-col" : "flex-col sm:flex-row"}`}>
                <img
                src={drivewayImage}
                alt="Parking spot"
                className={`w-full rounded-lg object-cover ${view === "grid" ? "h-40" : "h-44 sm:h-32 sm:w-36"}`}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                         <h3 className="truncate text-md font-semibold">{drivewayName}</h3>
                   <p className="flex min-w-0 items-center gap-1 text-sm text-text-muted">
                    <FaStar className="shrink-0 text-text-muted" />
                    <span className="truncate">4.98 {drivewayAddress}</span>
                   </p>
                   <p className="flex items-center gap-1 text-sm text-text-muted"><FaPersonWalking className="shrink-0 text-text-muted" />
                    {walkMin} min walk to the ballpark</p>
                   <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap gap-2">
                        <Button className="flex items-center gap-2 text-sm"><CiCalendar/> All game dates</Button>
                        <Button className="bg-surface-subtle text-brand-300 border text-sm border-border-subtle hover:bg-brand-50">View spot</Button>
                    </div>
                    <div className="flex items-center gap-2">
                    <p className="ml-auto shrink-0 font-semibold text-text-main">${price}</p>
                    <p className="ml-auto shrink-0 text-sm text-text-muted">/ game</p>
                    </div>
                   </div>
                </div>
             </div>
        </Card>

        {/* Sibling of Card so clicks inside the modal don't bubble to the card's onClick */}
        <Modal open={isOpen} onClose={() => setIsOpen(false)} title={drivewayName} className={modalTab === "games" ? "max-w-xl" : "max-w-md"}>
            <p className="text-sm text-text-muted">{drivewayAddress}</p>
                            <div className="grid w-full max-w-full grid-cols-2 items-center gap-1 rounded-button bg-gray-100 p-1" role="group" aria-label="Parking information">
                                <Button type="button" className="inline-flex h-full min-w-0 items-center justify-center gap-2 border border-transparent bg-transparent text-sm font-semibold text-text-muted shadow-none hover:bg-[#eceef1] hover:text-text-main aria-pressed:-translate-y-px aria-pressed:bg-surface-base aria-pressed:text-text-main aria-pressed:shadow-[0_2px_5px_rgb(0_0_0/0.1)] aria-pressed:hover:bg-surface-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-pressed={modalTab === "details"} onClick={() => setModalTab("details")}><CiCalendar/> Details</Button>
                                <Button type="button" className="inline-flex h-full min-w-0 items-center justify-center gap-2 border border-transparent bg-transparent text-sm font-semibold text-text-muted shadow-none hover:bg-[#eceef1] hover:text-text-main aria-pressed:-translate-y-px aria-pressed:bg-surface-base aria-pressed:text-text-main aria-pressed:shadow-[0_2px_5px_rgb(0_0_0/0.1)] aria-pressed:hover:bg-surface-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-pressed={modalTab === "games"} onClick={() => setModalTab("games")}><CiCalendar/> All game dates</Button>
                            </div>
            {modalTab === "details" && (
                <>
            <div className="grid grid-cols-2 gap-2">
                {(drivewayImages.length > 0 ? drivewayImages : [drivewayImage]).map((src) => (
                    <img key={src} src={src} alt={drivewayName} className="h-32 w-full rounded-lg object-cover" />
                ))}
            </div>

            
            <div className="flex flex-col gap-1 text-sm text-text-muted">
                {stadium && <p>{walkMin} min walk to {stadium}</p>}
                {postedAt && <p>Posted {new Date(postedAt).toLocaleDateString()}</p>}
            </div>
            <Card className="h-auto min-w-0 p-4">
                <CardHeader className="p-0 pb-2 font-semibold">Notes from owner</CardHeader>
                <div className="space-y-2">
                    {rules.map((rule, index) => (
                        <CardDescription key={index} className="whitespace-pre-wrap wrap-anywhere">{rule}</CardDescription>
                    ))}
                </div>
            </Card>
            <div className="relative flex items-center gap-2 text-sm">
                <IoShieldCheckmarkOutline aria-hidden="true" className="shrink-0 text-lg text-green-600" />
                <p>Free cancellation</p>
                <span className="group/info inline-flex shrink-0">
                    <button
                        type="button"
                        aria-label="Cancellation policy"
                        aria-describedby={cancellationTooltipId}
                        className="inline-flex size-8 items-center justify-center rounded text-text-muted hover:bg-surface-subtle hover:text-text-main focus-visible:outline-2 focus-visible:outline-primary"
                    >
                        <IoInformationCircleOutline aria-hidden="true" className="text-lg" />
                    </button>
                    <span
                        id={cancellationTooltipId}
                        role="tooltip"
                        className="pointer-events-none invisible absolute bottom-full right-0 z-10 mb-2 w-64 max-w-full rounded-md bg-text-main p-3 text-xs leading-relaxed text-white shadow-pop group-hover/info:visible group-focus-within/info:visible"
                    >l
                        Cancel at least 24 hours before your parking start time to receive a full refund.
                    </span>
                </span>
            </div>
                    <p className="font-semibold">${price} <span className="text-sm font-normal text-text-muted">/ game</span></p>
                    <Button className="flex items-center justify-center gap-2">Continue to payment <IoArrowForward aria-hidden="true" className="shrink-0" /></Button>
            </>
            )}

            {modalTab === "games" && (
            <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <p className="text-sm text-text-muted">2026</p>
                <Select
                    aria-label="Month"
                    options={monthOptions}
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                />
            </div>
            {filteredGames.length === 0 ? (
                <p role="status" className="text-sm text-text-muted">No home games available for the selected month.</p>
            ) : (
                <ul aria-label="Cubs home games" className="flex flex-col gap-3">
                    {filteredGames.map((game) => (
                        <li key={game._id}>
                            <Card className="flex h-auto min-w-0 flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                <CardTitle className="text-base font-semibold leading-normal tracking-normal">
                                    Cubs vs {game.visiting_team}
                                </CardTitle>
                                <div className="flex flex-wrap items-center gap-2">
                                <CardDescription>
                                    {new Date(game.date).toLocaleDateString("en-US", {
                                        timeZone: "UTC",
                                        weekday: "short",
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </CardDescription>
                                <span aria-hidden="true" className="text-sm text-text-muted">&middot;</span>
                                <CardDescription>
                                    {game.game_time} CT
                                </CardDescription>
                                </div>
                                <CardDescription>Parking begins {game.parkingBegins} CT</CardDescription>
                                <p className={`inline-flex items-center gap-1.5 self-start text-sm rounded px-3 py-1 ${game.blocked ? "text-text-muted bg-surface-subtle" : game.booked ? "text-danger bg-danger-subtle" : "text-primary bg-border-subtle"}`}>
                                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
                                    {game.blocked ? "Blocked" : game.booked ? "Booked" : "Available"}
                                </p>
                                </div>
                                <div className="flex shrink-0 flex-col items-end gap-2">
                                    <p className="font-semibold text-text-main">
                                        ${price} <span className="text-sm font-normal text-text-muted">/ game</span>
                                    </p>
                                    <Button
                                        type="button"
                                        disabled
                                        title="Payment page is not available yet"
                                        className="flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Continue to payment
                                        <IoArrowForward aria-hidden="true" className="shrink-0" />
                                    </Button>
                                </div>
                            </Card>
                        </li>
                    ))} 
                    
                </ul>
            )}
            </div>
            )}
            
        </Modal>
        </>
    )
}
