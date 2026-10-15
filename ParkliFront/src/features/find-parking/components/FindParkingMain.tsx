import Button from "../../../components/primitives/Button";
import VerticalCardList from "../../../components/primitives/ScrollableList";
import  { DrivewayCard } from "./DrivewayCard";
import { CiLocationOn } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import { FilteringNAV } from "./FilteringNAV";
import { useFindParking } from "../hooks/useFindParking";
import { CardHeader } from "../../../components/primitives/Card";



export function FindParkingMain() {

    const {driveways} = useFindParking();


    return(
        <>
        <div className="flex flex-col gap-5">
        <div className="flex gap-2">
            <CiLocationOn />
            <p className="text-brand-500 text-sm">WRIGLEYVILLE, CHICAGO</p>
        </div>
        <p className="text-3xl font-semibold">Game day starts with a good spot.</p>
        <p className="text-text-muted text-sm">Park in a neighbor's driveway. Walk to Wrigley. Enjoy the game.</p>
        <FilteringNAV/>
        <div className="flex gap-2">
            <Button title="Filters" className="bg-surface-subtle text-brand-300 text-sm border-1 border-border-subtle hover:bg-brand-50">
                <span className="inline-flex items-center gap-2">
                    <GoFilter aria-hidden="true" />
                    Filters
                </span>
            </Button>
            <Button children="Under 30$" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle hover:bg-brand-50"/>
            <Button children="5 min walk" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle hover:bg-brand-50"/>
            <Button children="Instant booking" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle hover:bg-brand-50"/>
            <Button children="SUV friendly" className="bg-surface-subtle text-brand-300 border-1 text-sm border-border-subtle hover:bg-brand-50"/>
        </div>
        </div>


        <CardHeader className="text-xl font-semibold pb-0">Spots near Wrigley Field</CardHeader>

        <div className="mt-8 w-full lg:w-11/20">
            <div className="mb-3 flex w-full items-center justify-between gap-3">
                <p className="text-sm text-text-muted">
                    {driveways.length} {driveways.length === 1 ? "spot" : "spots"}
                </p>
                <label className="flex items-center gap-2 text-sm text-text-muted">
                    <span>Sort:</span>
                    <select defaultValue="recommended" className="rounded border border-border-subtle bg-surface-base px-2 py-1 text-text-main">
                        <option value="recommended">Recommended</option>
                        <option value="price-low">Price: low to high</option>
                        <option value="price-high">Price: high to low</option>
                    </select>
                </label>
            </div>
            <VerticalCardList>
                {driveways.map((driveway) => (
                    <DrivewayCard key={driveway._id} drivewayId={driveway._id} drivewayImage={driveway.images[0]} drivewayName={driveway.name} drivewayAddress={driveway.address} walkMin={driveway.walk} price={driveway.price} />
                ))}
            </VerticalCardList>
        </div>
        </>
    )
}