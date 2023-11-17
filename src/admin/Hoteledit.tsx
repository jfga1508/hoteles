import { useState, useEffect, FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getHotels, updateHotel } from '../data/hotels';
import uuid from 'react-uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Hoteledit = () => {
    const { hotelId } = useParams();
    const [hotels, sethotels] = useState<any>();
    const [amountRooms, setamountRooms] = useState(1);
    const city = useRef<any>();

    const [message, setMessage] = useState(false);
    const handleCloseMessage = () => setMessage(false);
    const handleShowMessage = () => setMessage(true);

    useEffect(() => {
        getHotels({ id: hotelId }).then((data) => {
            if (data[0]) {
                sethotels(data[0]);
                setamountRooms(data[0].rooms.length);
            }
        });
    }, [hotelId]);

    const deleteRoom = (index: number) => {
        const hotel = hotels;
        delete hotel.rooms[index];

        hotel.rooms = hotel.rooms.filter((item: any) => {
            return item;
        });

        console.log(hotel, hotel.rooms.length);

        sethotels(hotel);

        setamountRooms(hotel.rooms.length);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e!.target as HTMLFormElement);
        const rooms = [];

        for (let index = 0; index < amountRooms; index++) {
            rooms.push({
                roomId: uuid(),
                name: formData.get('room[' + index + '][name]') ?? '',
                price: formData.get('room[' + index + '][price]') ?? '',
                tax: formData.get('room[' + index + '][tax]') ?? '',
                type: formData.get('room[' + index + '][type]') ?? '',
                reservations: [],
            });
        }

        if (hotelId) {
            const newData = {
                hotelId: hotels?.hotelId,
                id: hotelId,
                name: formData.get('name') ?? '',
                country: formData.get('country') ?? '',
                city: city.current.value.toLowerCase() ?? '',
                rooms,
            };

            updateHotel(newData).then(() => handleShowMessage());
        }
    };

    const renderRooms = () => {
        const rooms = [];

        for (let index = 0; index < amountRooms; index++) {
            rooms.push(
                <div className='border p-3' key={index}>
                    <Button
                        variant='danger mb-4'
                        onClick={() => deleteRoom(index)}
                    >
                        Delete
                    </Button>
                    <div className='search_group'>
                        <label htmlFor={`room_name${index}`}>Room name</label>
                        <input
                            type='text'
                            id={`room_name${index}`}
                            name={`room[${index}][name]`}
                            placeholder='Room name'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].name) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            name: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_type${index}`}>Type</label>
                        <input
                            type='text'
                            id={`room_type${index}`}
                            name={`room[${index}][type]`}
                            placeholder='Type'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].type) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            type: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_price${index}`}>Price</label>
                        <input
                            type='number'
                            id={`room_price${index}`}
                            name={`room[${index}][price]`}
                            placeholder='Price'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].price) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            price: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor={`room_tax${index}`}>Tax</label>
                        <input
                            type='number'
                            id={`room_tax${index}`}
                            name={`room[${index}][tax]`}
                            placeholder='Tax'
                            value={
                                (hotels?.rooms[index] &&
                                    hotels?.rooms[index].tax) ||
                                ''
                            }
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    rooms: {
                                        ...hotels.rooms,
                                        [index]: {
                                            ...hotels.rooms[index],
                                            tax: e.target.value,
                                        },
                                    },
                                })
                            }
                            required
                        />
                    </div>
                </div>
            );
        }

        return <div className='d-flex gap-3 flex-wrap mb-4'>{rooms}</div>;
    };

    return (
        <>
            <h2>Add hotel</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='d-flex justify-content-center gap-3'>
                    <div className='search_group'>
                        <label htmlFor='name'>Hotel name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Hotel name'
                            value={hotels?.name || ''}
                            onChange={(e) =>
                                sethotels({ ...hotels, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor='country'>Country</label>
                        <input
                            type='text'
                            id='country'
                            name='country'
                            placeholder='Country'
                            value={hotels?.country || ''}
                            onChange={(e) =>
                                sethotels({
                                    ...hotels,
                                    country: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor='city'>City</label>
                        <input
                            type='text'
                            id='city'
                            name='city'
                            placeholder='City'
                            value={hotels?.city || ''}
                            ref={city}
                            onChange={(e) =>
                                sethotels({ ...hotels, city: e.target.value })
                            }
                            required
                        />
                    </div>
                </div>

                <h3>Rooms</h3>

                <Button
                    variant='primary mb-4'
                    onClick={() => setamountRooms(amountRooms + 1)}
                >
                    Add a room
                </Button>

                {renderRooms()}

                <div className='d-flex justify-content-center'>
                    <Button type='submit' variant='primary'>
                        Save hotel
                    </Button>
                </div>
            </form>

            <Modal show={message} onHide={handleCloseMessage}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The hotel is now saved.</p>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Hoteledit;
