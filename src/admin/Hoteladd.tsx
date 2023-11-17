import { useState, useEffect, FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getHotels, createHotel } from '../data/hotels';
import { Hotel } from '../interfaces/hotels';
import Header from '../layouts/Header.tsx';
import uuid from 'react-uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Login from './Login';
import useToken from '../data/users';

const Hoteladd = () => {
    const { token, setToken } = useToken();
    const { hotelId } = useParams();
    const [hotels, sethotels] = useState<Hotel>();
    const [amountRooms, setamountRooms] = useState(1);
    const city = useRef<any>();

    const [message, setMessage] = useState(false);
    const handleCloseMessage = () => setMessage(false);
    const handleShowMessage = () => setMessage(true);

    useEffect(() => {
        if (!token) {
            return;
        }
        getHotels({ id: hotelId }).then((data) => {
            if (data[0]) {
                sethotels(data[0]);
                setamountRooms(data[0].rooms.length);
            }
        });
    }, [hotelId, token]);

    if (!token) {
        return <Login setToken={setToken} />;
    }

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

        const newData = {
            hotelId: uuid(),
            name: formData.get('name') ?? '',
            country: formData.get('country') ?? '',
            city: city.current.value.toLowerCase() ?? '',
            rooms,
        };

        createHotel(newData).then(() => handleShowMessage());
    };

    const renderRooms = () => {
        const rooms = [];

        for (let index = 0; index < amountRooms; index++) {
            rooms.push(
                <div className='border p-3' key={index}>
                    <div className='search_group'>
                        <label htmlFor={`room_name${index}`}>Room name</label>
                        <input
                            type='text'
                            id={`room_name${index}`}
                            name={`room[${index}][name]`}
                            placeholder='Hotel name'
                            value={
                                hotels?.rooms[index] &&
                                hotels?.rooms[index].name
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
                            placeholder='Country'
                            value={
                                hotels?.rooms[index] &&
                                hotels?.rooms[index].type
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
                                hotels?.rooms[index] &&
                                hotels?.rooms[index].price
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
                                hotels?.rooms[index] && hotels?.rooms[index].tax
                            }
                            required
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className='d-flex gap-3 flex-wrap justify-content-center mb-4'>
                {rooms}
            </div>
        );
    };

    return (
        <>
            <Header />
            <main>
                <h2>Add hotel</h2>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='d-flex justify-content-center flex-wrap gap-3'>
                        <div className='search_group'>
                            <label htmlFor='name'>Hotel name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Hotel name'
                                value={hotels?.name}
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
                                value={hotels?.country}
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
                                ref={city}
                                value={hotels?.city}
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
            </main>
        </>
    );
};

export default Hoteladd;
