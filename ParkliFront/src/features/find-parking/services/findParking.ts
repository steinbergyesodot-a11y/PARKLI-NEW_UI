import { findParkingApi } from "../api/findParkingApi";

export class FindParkingService {

  async getAllDriveways() {
    const response  = await findParkingApi.getAllDriveways();
    return response.data
  }
}

export const findParkingService = new FindParkingService();