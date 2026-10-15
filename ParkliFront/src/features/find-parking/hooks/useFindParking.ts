import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { findParkingService } from "../services/findParking";


interface Driveway {
  _id: string;
  address: string;
  publicDisplay: string;
  walk: number;
  name: string;
  stadium: string;
  price: number;
  images: string[];
  PostedAt: string;
}
export function useFindParking() {
    const [driveways,setDriveways] = useState<Driveway[]>([]);
    const navigate = useNavigate();


    async function getAllDriveways() {
        try {
            const response = await findParkingService.getAllDriveways();            
            // Handle response structure - backend returns {success: true, data: [...], error: null}
            // dashboardService already extracts response.data, so we get {success: true, data: [...], error: null}
            const drivewayArray = response?.data ? response.data : Array.isArray(response) ? response : [];
            setDriveways(drivewayArray);
        } catch (error: any) {
            const errorMsg = error.message || "Failed to load driveways";
            console.error("Error fetching driveways:", error);
        } finally {
        }
    }

    useEffect(() => {
        getAllDriveways();
    }, []);

    return {driveways,getAllDriveways}
}