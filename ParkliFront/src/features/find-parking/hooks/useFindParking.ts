import { useState, useEffect } from "react";
import { findParkingService } from "../services/findParking";
import type { IGame } from "../components/DrivewayCard";


export interface Driveway {
  _id: string;
  address: string;
  publicDisplay: string;
  walk: number;
  name: string;
  stadium: string;
  games : IGame[]
  price: number;
  images: string[];
  rules: string[];
  PostedAt: string;
}
async function getAllDriveways(setDriveways: (driveways: Driveway[]) => void) {
    try {
        const response = await findParkingService.getAllDriveways();
        const drivewayArray = response?.data ? response.data : Array.isArray(response) ? response : [];
        setDriveways(drivewayArray);
    } catch (error: unknown) {
        console.error("Error fetching driveways:", error);
    }
}

async function getDrivewayById(
    setDriveway: (driveway: Driveway) => void,
    id: string,
): Promise<Driveway> {
    const response = await findParkingService.getDrivewayById(id);
    const selectedDriveway: Driveway = response?.data ?? response;
    setDriveway(selectedDriveway);
    return selectedDriveway;
}

export function useGetAllDriveways() {
    const [driveways, setDriveways] = useState<Driveway[]>([]);

    useEffect(() => {
        void getAllDriveways(setDriveways);
    }, []);

    return { driveways, getAllDriveways: getAllDriveways.bind(null, setDriveways) };
}

export function useGetDrivewayById(id?: string) {
    const [driveway, setDriveway] = useState<Driveway | null>(null);

    useEffect(() => {
        if (!id) return;

        let active = true;
        void getDrivewayById((selectedDriveway) => {
            if (active) setDriveway(selectedDriveway);
        }, id).catch((error: unknown) => {
            if (active) console.error("Error fetching driveway:", error);
        });

        return () => {
            active = false;
        };
    }, [id]);

    return { driveway, getDrivewayById: getDrivewayById.bind(null, setDriveway) };
}