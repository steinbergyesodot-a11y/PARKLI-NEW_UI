import { useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { Card } from "../../../components/primitives/Card";
import { Modal } from "../../../components/primitives/Modal";
import { FaStar } from "react-icons/fa";
import Button from "../../../components/primitives/Button";
import { CiCalendar } from "react-icons/ci";

interface DrivewayCardProps {
    drivewayId: string
    drivewayImage: string
    drivewayName: string
    drivewayAddress: string
    walkMin: number
    price: number
    drivewayImages?: string[]
    stadium?: string
    publicDisplay?: string
    postedAt?: string
    view?: "list" | "grid"
}  

export function DrivewayCard({ drivewayImage, drivewayImages = [], drivewayName, drivewayAddress, walkMin, price, stadium, publicDisplay, postedAt, view = "list" }: DrivewayCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalTab, setModalTab] = useState<"details" | "games">("details");

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
        <Modal open={isOpen} onClose={() => setIsOpen(false)} title={drivewayName} className="max-w-md">
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
            <p className="font-semibold">${price} <span className="text-sm font-normal text-text-muted">/ game</span></p>
            </>
            )}

            {modalTab === "games" && (
            <div className="flex flex-col gap-2">
                <Button className="flex items-center gap-2 text-sm"><CiCalendar/> All game dates</Button>
                <Button className="bg-surface-subtle text-brand-300 border text-sm border-border-subtle hover:bg-brand-50">View spot</Button>
            </div>
            )}
            
        </Modal>
        </>
    )
}