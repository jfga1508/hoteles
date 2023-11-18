export interface Hotel {
    id?: string | FormDataEntryValue;
    isEnabled: boolean;
    hotelId: string;
    name: string;
    country: string;
    city: string;
    rooms: Room[];
}

export interface Room {
    isValid?: boolean;
    isEnabled: boolean;
    roomId: string;
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
