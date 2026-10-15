import { FaPersonWalking } from "react-icons/fa6";
import { Card } from "../../../components/primitives/Card";
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
    view?: "list" | "grid"
}  

export function DrivewayCard({ drivewayImage, drivewayName, drivewayAddress, walkMin, view = "list" }: DrivewayCardProps) {
    return(
        <Card className="h-auto w-full border border-brand-100">
             <div className={`flex gap-3 p-3 ${view === "grid" ? "flex-col" : "flex-col sm:flex-row"}`}>
                <img
                src={drivewayImage}
                alt="Parking spot"
                className={`w-full rounded-lg object-cover ${view === "grid" ? "h-40" : "h-44 sm:h-32 sm:w-36"}`}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                   <h3 className="text-md font-semibold">{drivewayName}</h3>
                   <p className="flex min-w-0 items-center gap-1 text-sm text-text-muted">
                    <FaStar className="shrink-0 text-text-muted" />
                    <span className="truncate">4.98 {drivewayAddress}</span>
                   </p>
                   <p className="flex items-center gap-1 text-sm text-text-muted"><FaPersonWalking className="shrink-0 text-text-muted" />
                    {walkMin} min walk to the ballpark</p>
                <div className="flex flex-wrap gap-2">
                    <Button className="flex items-center gap-2 text-sm"><CiCalendar/> All game dates</Button>
                    <Button className="bg-surface-subtle text-brand-300 border text-sm border-border-subtle hover:bg-brand-50">View spot</Button>


                </div>
                </div>
             </div>
        </Card>
    )
}