export interface Hotel {
    id: string;
    hotelId: number;
    name: string;
    country: string;
    city: string;
    rooms: Room[];
}

export interface Room {
    roomId: number;
    name: string;
    price: number;
    tax: number;
    type: Type;
}

enum Type {
    Lux,
    Single,
    Double,
}
