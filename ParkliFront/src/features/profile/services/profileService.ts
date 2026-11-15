import { profileApi } from "../api/profileApi";

export class ProfileService {

  async getAllBookinsByRenterId(id:string) {
    const response  = await profileApi.getAllBookingsByRenterId(id);
    return response.data
  }
}

export const profileService = new ProfileService();