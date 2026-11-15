import api from "../../../lib/axiosClient";

export const profileApi = {
  getAllBookingsByRenterId: function (id: string) {
    return api.get(`/api/bookings/${id}`);
  },
   
};