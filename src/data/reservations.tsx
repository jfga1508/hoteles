import { Reservation } from '../interfaces/reservations';
const api = import.meta.env.VITE_API_URL + '/api';

export const getReservations = async ({ id }: { id?: string }) => {
    const data = await fetch(
        api + (id ? `reservation/${id}` : `reservations/`)
    ).then((data) => data.json());

    return data;
};

export const createReservation = async (reservation: Reservation) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const data = await fetch(`${api}/reservation`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(reservation),
    }).then((data) => data.json());

    return data;
};
