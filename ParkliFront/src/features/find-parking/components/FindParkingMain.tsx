import { Card } from "../../../components/primitives/Card";
import VerticalCardList from "../../../components/primitives/ScrollableList";
import  { DrivewayCard } from "./DrivewayCard";
import { CiLocationOn } from "react-icons/ci";


export function FindParkingMain() {
    return(
        <>
        <div className="flex gap-2">
            <CiLocationOn />
            <p className="text-brand-500 text-sm">WRIGLEYVILLE, CHICAGO</p>
        </div>
        <p className="text-2xl font-semibold">Game day starts with a good spot.</p>
        <p className="text-text-muted text-sm">Park in a neighbor's driveway. Walk to Wrigley. Enjoy the game.</p>
        <Card/>
        <VerticalCardList>
            <DrivewayCard/>
        </VerticalCardList>
        </>
    )
}