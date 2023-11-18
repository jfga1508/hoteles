import { Hotel, Room, Reservations } from '../interfaces/hotels';
const api = import.meta.env.VITE_API_URL + '/api';

export const getHotels = async ({
    id,
    city,
    from,
    to,
}: {
    id?: string;
    city?: string;
    from?: string | null;
    to?: string | null;
}) => {
    const data = await fetch(api + (id ? `/hotel/${id}` : `/hotels/${city}`))
        .then((data) => data.json())
        .then((data) => {
            if (from && to) return validateHotelRooms({ data, from, to });
            else return data;
        });

    return data;
};

export const createHotel = async (hotel: object) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const data = await fetch(`${api}/hotel`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(hotel),
    }).then((data) => data.json());

    return data;
};

export const updateHotel = async (hotel: object) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const data = await fetch(`${api}/hotel`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(hotel),
    }).then((data) => data.json());

    return data;
};

export const deleteHotel = async (hotel: object) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const data = await fetch(`${api}/hotel`, {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify(hotel),
    }).then((data) => data.json());

    return data;
};

export const validateHotelRooms = ({
    data,
    from,
    to,
}: {
    data: Array<Hotel>;
    from: string | null;
    to: string | null;
}) =>
    data &&
    data.map((obj) => {
        obj.rooms = obj.rooms
            .map((room: Room) => {
                if (to && from) {
                    const isReserved = room.reservations.filter(
                        (reservation: Reservations) => {
                            if (
                                (reservation.checkout >= to &&
                                    reservation.checkin <= to) ||
                                (reservation.checkout >= from &&
                                    reservation.checkin <= from) ||
                                (reservation.checkout <= to &&
                                    reservation.checkin >= from)
                            )
                                return true;
                            else return false;
                        }
                    );

                    room.isValid = isReserved.length > 0 ? false : true;
                }
                return room;
            })
            .sort((a, b) => a.price - b.price);

        return obj;
    });
