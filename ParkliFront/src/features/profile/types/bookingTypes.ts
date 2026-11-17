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

export interface IGame {
    _id: string;
  visiting_team: string;
  game_time: string,
  parkingBegins: string;
  date: string;
  booked: boolean;
  blocked: boolean;
}
export interface Driveway {
      drivewayId: string
      drivewayImage: string
      drivewayName: string
      drivewayAddress: string
      walkMin: number
      price: number
      drivewayImages?: string[]
      stadium?: string
      rules: string []
      publicDisplay?: string
      postedAt?: string
      games: IGame[]
}
