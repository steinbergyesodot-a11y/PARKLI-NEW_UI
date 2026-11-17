import api from "../../../lib/axiosClient";

export const profileApi = {
  getAllBookingsByRenterId: function (id: string) {
    return api.get(`/api/bookings/${id}`);
  },

  getAllBookingsByOwnerId: function (id: string) {
    return api.get(`/api/bookings/owner/${id}`);
  },

  blockGame: function (drivewayId: string, gameDate: string) {
    return api.put(`/api/driveways/${drivewayId}/block/${gameDate}`);
  },
   
};