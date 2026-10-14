import Button from "../../../components/primitives/Button";
import { Card } from "../../../components/primitives/Card";
import VerticalCardList from "../../../components/primitives/ScrollableList";
import  { DrivewayCard } from "./DrivewayCard";
import { CiLocationOn } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import { FilteringNAV } from "./FilteringNAV";



export function FindParkingMain() {
    return(
        <>
        <div className="flex flex-col gap-5">
        <div className="flex gap-2">
            <CiLocationOn />
            <p className="text-brand-500 text-sm">WRIGLEYVILLE, CHICAGO</p>
        </div>
        <p className="text-2xl font-semibold">Game day starts with a good spot.</p>
        <p className="text-text-muted text-sm">Park in a neighbor's driveway. Walk to Wrigley. Enjoy the game.</p>
        <FilteringNAV/>
        <div className="flex gap-2">
            <Button title="Filters" className="bg-surface-subtle text-brand-300 text-sm border-1 border-border-subtle hover:bg-surface-base">
                <span className="inline-flex items-center gap-2">
                    <GoFilter aria-hidden="true" />
                    Filters
                </span>
            </Button>
            <Button children="Under 30$" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle"/>
            <Button children="5 min walk" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle"/>
            <Button children="Instant booking" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle"/>
            <Button children="SUV friendly" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle"/>
        </div>
        </div>
    
        </>
    )
}