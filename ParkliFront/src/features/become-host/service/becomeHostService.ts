import { addDrivewayApi } from "../api/becomeHostApi";

export class AddDrivewayService {

  async addDriveway(data: any) {
    const response  = await addDrivewayApi.addDriveway(data);
    return response.data
  }

}

export const addDrivewayService = new AddDrivewayService();
