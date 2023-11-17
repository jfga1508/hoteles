export interface Reservation {
    id?: string | null;
    hotelId: string;
    name: string;
    country: string;
    city: string;
    room: Room;
    checkin: string;
    checkout: string;
    emergency_contact: EmergencyContact;
    user: User;
}

export interface Room {
    roomId: number;
    name: string;
    price: number;
    tax: number;
    type: string;
}

export interface EmergencyContact {
    name: unknown;
    tel: unknown;
}

export interface User {
    name: unknown;
    birth_date: unknown;
    gender: unknown;
    id_type: unknown;
    id: unknown;
    email: unknown;
    tel: unknown;
}
