import { paymentApi } from "../api/paymentApi";

export class PaymentService {

  async createPaymentIntent(data: any) {
    const response  = await paymentApi.createPaymentIntent(data);
    return response.data; 
  }
}

export const paymentService = new PaymentService();