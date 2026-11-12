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

   async updateDrivewayDate(drivewayId:string, gameDate:string){
    const response  = await findParkingApi.updateDrivewayDate(drivewayId,gameDate);
    return response.data
  }
}

export const findParkingService = new FindParkingService();