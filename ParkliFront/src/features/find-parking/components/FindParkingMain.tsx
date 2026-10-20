import { useState } from "react";
import Button from "../../../components/primitives/Button";
import VerticalCardList from "../../../components/primitives/ScrollableList";
import  { DrivewayCard } from "./DrivewayCard";
import { CiLocationOn } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import { FilteringNAV } from "./FilteringNAV";
import { useFindParking } from "../hooks/useFindParking";
import { CardHeader } from "../../../components/primitives/Card";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import type { CubsHomeGame } from "../../../lib/utils/cubsSchedual";



export function FindParkingMain() {

    const {driveways} = useFindParking();
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [selectedGame, setSelectedGame] = useState<CubsHomeGame | null>(null);
    const drivewayCards = driveways.map((driveway) => (
        <DrivewayCard
            key={driveway._id}
            drivewayId={driveway._id}
            drivewayImage={driveway.images[0]}
            drivewayImages={driveway.images}
            stadium={driveway.stadium}
            publicDisplay={driveway.publicDisplay}
            postedAt={driveway.PostedAt}
            drivewayName={driveway.name}
            rules={driveway.rules}
            drivewayAddress={driveway.address}
            walkMin={driveway.walk}
            price={driveway.price}
            view={viewMode}
            selectedGame={selectedGame}
        />
    ));


    return(
        <>
        <div className="flex flex-col gap-5">
        <div className="flex gap-2">
            <CiLocationOn />
            <p className="text-brand-500 text-sm">WRIGLEYVILLE, CHICAGO</p>
        </div>
        <p className="text-3xl font-semibold">Game day starts with a good spot.</p>
        <p className="text-text-muted text-sm">Park in a neighbor's driveway. Walk to Wrigley. Enjoy the game.</p>
        <FilteringNAV selectedGame={selectedGame} onSelectGame={setSelectedGame}/>
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


        <CardHeader className="text-xl font-semibold mt-3 pl-0 pb-0">Spots near Wrigley Field</CardHeader>

        <div className="mt-2 w-full lg:w-11/20">
            <div className="mb-3 flex w-full flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-text-muted">
                    {driveways.length} {driveways.length === 1 ? "spot" : "spots"}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-2 text-sm text-text-muted">
                        <span>Sort:</span>
                        <select defaultValue="recommended" className="rounded border border-border-subtle bg-surface-base px-2 py-1 text-text-main">
                            <option value="recommended">Recommended</option>
                            <option value="price-low">Price: low to high</option>
                            <option value="price-high">Price: high to low</option>
                        </select>
                    </label>
                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            title="List view"
                            aria-label="List view"
                            aria-pressed={viewMode === "list"}
                            onClick={() => setViewMode("list")}
                            className="rounded border border-border-subtle bg-surface-base p-2 text-text-muted hover:bg-brand-50 aria-pressed:bg-brand-50 aria-pressed:text-brand-600"
                        >
                            <LuList aria-hidden="true" />
                        </Button>
                        <Button
                            type="button"
                            title="Grid view"
                            aria-label="Grid view"
                            aria-pressed={viewMode === "grid"}
                            onClick={() => setViewMode("grid")}
                            className="rounded border border-border-subtle bg-surface-base p-2 text-text-muted hover:bg-brand-50 aria-pressed:bg-brand-50 aria-pressed:text-brand-600"
                        >
                            <LuLayoutGrid aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            </div>
            <VerticalCardList
                spacing={viewMode === "grid" ? "space-y-0" : "space-y-4"}
                className={viewMode === "grid" ? "grid grid-cols-1 gap-4 lg:grid-cols-2" : ""}
            >
                {drivewayCards}
            </VerticalCardList>
        </div>
        </>
    )
}