

export interface Banners {
  id: number;
  url: string;
}
export interface Cities {
  id: number;
  name: string;
}

export interface Hotels {
  id: number;
  name: string;
  city: string;
  address: string;
  rooms: Rooms[];
  available_rooms: Rooms[];
  status: boolean;
}

export type Rooms = {
  id: number;
  hotel: {
    id: number,
    name: string
  };
  number: number;
  base_price: number;
  location: string;
  type: string;
  tax: number;
  max_people: number;
  status: boolean;
  dates_reservations:string[]
}

