import api from "../../../lib/axiosClient";

export const paymentApi = {
  createPaymentIntent: function (data: any) {
    return api.post("/api/bookings/createPaymentIntent",data);
  },
  
};