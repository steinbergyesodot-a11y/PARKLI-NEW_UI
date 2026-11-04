import { findParkingApi } from "../api/findParkingApi";

export class FindParkingService {

  async getAllDriveways() {
    const response  = await findParkingApi.getAllDriveways();
    return response.data
  }

  async getDrivewayById(id: string) {
    const response = await findParkingApi.getDrivewayById(id);
    return response.data;
  }
}

export const findParkingService = new FindParkingService();