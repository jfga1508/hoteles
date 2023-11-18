import { useState, useEffect, FormEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getHotels, createHotel, updateHotel } from '../data/hotels';
import { Hotel } from '../interfaces/hotels';
import Header from '../layouts/Header.tsx';
import Rooms from '../components/Rooms.tsx';
import uuid from 'react-uuid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Login from './Login';
import useToken from '../data/users';

const Hoteladd = () => {
    const { token, setToken } = useToken();
    const { hotelId } = useParams();
    const [hotels, sethotels] = useState<Hotel>({
        hotelId: uuid(),
        name: '',
        country: '',
        city: '',
        isEnabled: true,
        rooms: [
            {
                roomId: uuid(),
                name: '',
                price: 0,
                tax: 0,
                type: '',
                isEnabled: true,
                reservations: [],
            },
        ],
    });
    const [amountRooms, setamountRooms] = useState(1);
    const city = useRef<any>();

    const [message, setMessage] = useState(false);
    const handleCloseMessage = () => setMessage(false);
    const handleShowMessage = () => setMessage(true);

    useEffect(() => {
        if (!token) {
            return;
        }
        if (hotelId) {
            getHotels({ id: hotelId }).then((data) => {
                if (data[0]) {
                    sethotels(data[0]);
                    setamountRooms(data[0].rooms.length);
                }
            });
        }
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
                isEnabled: formData.get('room[' + index + '][disable]')
                    ? false
                    : true,
                reservations: [],
            });
        }

        let newData: object = {
            hotelId: hotels.hotelId,
            name: formData.get('name') ?? '',
            country: formData.get('country') ?? '',
            city: city.current.value.toLowerCase() ?? '',
            isEnabled: formData.get('disable') ? false : true,
            rooms,
        };

        if (hotelId) {
            newData = {
                ...newData,
                id: hotelId,
            };
            updateHotel(newData).then(() => handleShowMessage());
        } else {
            createHotel(newData).then(() => handleShowMessage());
        }
    };

    return (
        <>
            <Header />
            <main>
                <h2>Add hotel</h2>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='d-flex justify-content-center flex-wrap gap-3 mb-4'>
                        <div className='search_group'>
                            <label htmlFor='name'>Hotel name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Hotel name'
                                value={hotels?.name || ''}
                                onChange={(e) =>
                                    sethotels({
                                        ...hotels,
                                        name: e.target.value,
                                    })
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
                                    sethotels({
                                        ...hotels,
                                        city: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className='border px-2 py-1 d-flex align-items-center'>
                            <Form.Check
                                type='switch'
                                id={`disable`}
                                label='Disable this hotel'
                                name={`disable`}
                                checked={!hotels?.isEnabled}
                                onChange={() =>
                                    sethotels({
                                        ...hotels,
                                        isEnabled: !hotels?.isEnabled,
                                    })
                                }
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

                    <Rooms
                        hotels={hotels}
                        amountRooms={amountRooms}
                        setamountRooms={(data: any) => setamountRooms(data)}
                        sethotels={(data: any) => sethotels(data)}
                    />

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
