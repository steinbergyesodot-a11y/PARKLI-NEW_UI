import { CiCalendar, CiLocationOn, CiSearch } from "react-icons/ci";
import { Card, CardDescription } from "../../../components/primitives/Card";
import Button from "../../../components/primitives/Button";
import { IoCarOutline, IoChevronDown } from "react-icons/io5";



export function FilteringNAV(){
    return(
        <Card className="flex h-auto min-h-20 w-full items-stretch">
            <div className="flex min-w-0 flex-1 items-center gap-3 border-r border-border-subtle px-4 py-3 sm:px-6">
                <CiLocationOn className="shrink-0 text-xl text-text-muted" />
                <div className="min-w-0">
                    <CardDescription className="font-semibold">WHERE TO?</CardDescription>
                    <p className="truncate text-sm">Wrigley Field, Chicago</p>
                </div>
            </div>
            <details className="group relative flex min-w-0 flex-1 border-r border-border-subtle px-4 py-3 sm:px-6">
                <summary className="flex w-full cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                    <CiCalendar className="shrink-0 text-xl text-text-muted" />
                    <div className="min-w-0">
                        <CardDescription className="font-semibold">CHOOSE YOUR GAME</CardDescription>
                        <p className="truncate text-sm text-text-muted">Select date</p>
                    </div>
                    <IoChevronDown className="ml-auto shrink-0 text-text-muted transition-transform group-open:rotate-180" />
                </summary>
                <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-lg border border-border-subtle bg-surface-base p-4 shadow-pop">
                    <label htmlFor="game-date" className="mb-2 block text-sm font-semibold">Game date</label>
                    <input id="game-date" type="date" className="w-full rounded border border-border-subtle px-3 py-2 text-sm" />
                </div>
            </details>
            <div className="relative flex min-w-0 flex-1 items-center gap-3 px-4 py-3 sm:px-6">
                <IoCarOutline className="shrink-0 text-xl text-text-muted" />
                <div className="min-w-0">
                    <CardDescription className="font-semibold">YOUR VEHICLE</CardDescription>
                    <p className="truncate text-sm text-text-muted">Any vehicle</p>
                </div>
                <details className="group relative ml-auto">
                    <summary aria-label="Choose vehicle" className="flex cursor-pointer list-none rounded p-1 text-text-muted hover:bg-surface-subtle [&::-webkit-details-marker]:hidden">
                        <IoChevronDown className="transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-border-subtle bg-surface-base p-3 shadow-pop">
                        <label htmlFor="vehicle-type" className="mb-2 block text-sm font-semibold">Vehicle type</label>
                        <select id="vehicle-type" defaultValue="Any vehicle" className="w-full rounded border border-border-subtle px-3 py-2 text-sm">
                            <option>Any vehicle</option>
                            <option>Car</option>
                            <option>SUV</option>
                            <option>Truck</option>
                            <option>Van</option>
                        </select>
                    </div>
                </details>
                <Button className="ml-auto flex shrink-0 items-center gap-2">
                    <CiSearch className="shrink-0 text-lg" />
                    Find a spot
                </Button>
            </div>
        </Card>
    )
}