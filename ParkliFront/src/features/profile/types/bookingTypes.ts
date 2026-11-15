export interface Booking {
  _id: string;
  drivewayId: string;
  ownerId: string;
  renterId: string;
  address: string;
  gameDate: string;
  parkingTime: string;
  price: number;
  visiting_team: string;
  bookedAt: string;
  cancelBy: string;
}
