export interface Reservation {
    hotelId: string;
    name: string;
    country: string;
    city: string;
    room: Room;
    'check-in': string;
    'check-out': string;
    emergency_contact: EmergencyContact;
    user: User;
}

export interface Room {
    roomId: number;
    name: string;
    price: number;
    tax: number;
    type: Type;
}

export interface EmergencyContact {
    name: string;
    tel: string;
}

export interface User {
    name: string;
    birth_date: string;
    gender: Gender;
    id_type: IDType;
    id: number;
    email: string;
    tel: string;
}

enum Gender {
    M,
    F,
}

enum IDType {
    'C.C.',
    Pasaporte,
    Identidad,
}

enum Type {
    Lux,
    Single,
    Double,
}
