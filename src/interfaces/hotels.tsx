export interface Hotel {
    id: string | FormDataEntryValue;
    hotelId: number;
    name: string;
    country: string;
    city: string;
    rooms: Room[];
}

export interface Room {
    isValid?: boolean;
    roomId: number;
    name: string;
    price: number;
    tax: number;
    type: string;
    reservations: Reservations[];
}

export interface Reservations {
    reservationId: string;
    checkin: string;
    checkout: string;
}
