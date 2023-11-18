import { useState, useEffect, FormEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getHotels } from '../data/hotels';
import { Hotel, Room } from '../interfaces/hotels';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../layouts/Header.tsx';
import { createReservation } from '../data/reservations';
import { Reservation } from '../interfaces/reservations';

const Hotelpage = () => {
    const { hotelId } = useParams();
    const [queryParameters] = useSearchParams();

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const [hotel, sethotel] = useState<Hotel>();
    const [selectedRoom, setselectedRoom] = useState<Room>();
    const [search, setsearch] = useState({
        id: hotelId,
        from: queryParameters.get('from') ?? `${yyyy}-${mm}-${dd}`,
        to: queryParameters.get('to') ?? `${yyyy}-${mm}-${dd + 1}`,
        persons: queryParameters.get('persons') ?? 1,
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = useState(false);
    const handleCloseMessage = () => setMessage(false);
    const handleShowMessage = () => setMessage(true);

    useEffect(() => {
        getHotels(search).then((data) => data && sethotel(data[0]));
    }, [search]);

    useEffect(() => {
        if (!selectedRoom) return;

        handleShow();
    }, [selectedRoom]);

    if (hotel?.isEnabled === false) return;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e!.target as HTMLFormElement);

        const reservation: Reservation = {
            hotelId: hotelId!,
            name: hotel!.name,
            country: hotel!.country,
            city: hotel!.city,
            checkin: search.from ?? '',
            checkout: search.to ?? '',
            room: {
                roomId: selectedRoom!.roomId,
                name: selectedRoom!.name,
                price: selectedRoom!.price,
                tax: selectedRoom!.tax,
                type: selectedRoom!.type,
            },
            emergency_contact: {
                name: formData.get('emergency_name') ?? '',
                tel: formData.get('emergency_tel') ?? '',
            },
            user: {
                name: formData.get('name') ?? '',
                birth_date: formData.get('birth_date') ?? '',
                gender: formData.get('gender') ?? '',
                id_type: formData.get('id_type') ?? '',
                id: formData.get('id') ?? '',
                email: formData.get('email') ?? '',
                tel: formData.get('tel') ?? '',
            },
        };

        createReservation(reservation).then((data) => {
            if (data.status) {
                sethotel(data.data);
                handleClose();
                handleShowMessage();
            }
        });
    };

    return (
        <>
            <Header />
            <main>
                <h1>{hotel?.name}</h1>

                <form className='search justify-content-center flex-wrap'>
                    <div className='search_group'>
                        <label htmlFor='from'>Check-in</label>
                        <input
                            id='from'
                            type='date'
                            min={`${yyyy}-${mm}-${dd}`}
                            max='2030-12-31'
                            name='from'
                            value={search.from}
                            onChange={(e) =>
                                setsearch({ ...search, from: e.target.value })
                            }
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor='to'>Check-out</label>
                        <input
                            type='date'
                            min={search.from}
                            max='2030-12-31'
                            name='to'
                            id='to'
                            value={search.to}
                            onChange={(e) =>
                                setsearch({ ...search, to: e.target.value })
                            }
                        />
                    </div>
                    <div className='search_group'>
                        <label htmlFor='persons'>Persons</label>
                        <input
                            type='number'
                            name='persons'
                            id='persons'
                            value={search.persons}
                            onChange={(e) =>
                                setsearch({
                                    ...search,
                                    persons: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                </form>

                <hr />
                <h2>Rooms</h2>

                <hr />
                <div className='d-flex flex-wrap gap-4'>
                    {hotel &&
                        hotel.rooms.map((room, index) => (
                            <div className='border p-2' key={index}>
                                <h3>{room.name}</h3>
                                <h4>{room.type}</h4>
                                <p>
                                    Prince per night: ${room.price}
                                    <br />
                                    <small>Taxes: ${room.tax}</small>
                                </p>
                                {room.isEnabled ? (
                                    room.isValid ? (
                                        <Button
                                            variant='primary'
                                            onClick={() =>
                                                setselectedRoom(room)
                                            }
                                        >
                                            Book now
                                        </Button>
                                    ) : (
                                        <div>Overbooked!</div>
                                    )
                                ) : (
                                    <div>Not available</div>
                                )}
                            </div>
                        ))}
                </div>

                {selectedRoom && (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Reserve {selectedRoom?.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form
                                className='d-flex justify-content-between gap-4'
                                action=''
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div className='d-flex flex-column gap-2'>
                                    <label>
                                        Full name
                                        <br />
                                        <input
                                            type='text'
                                            name='name'
                                            required
                                        />
                                    </label>
                                    <label>
                                        Birthdate
                                        <br />
                                        <input
                                            type='date'
                                            name='birth_date'
                                            required
                                        />
                                    </label>
                                    <label>
                                        Gender
                                        <br />
                                        <select name='gender'>
                                            <option value='M'>Male</option>
                                            <option value='F'>Female</option>
                                        </select>
                                    </label>
                                    <label>
                                        ID Type
                                        <br />
                                        <select name='id_type'>
                                            <option value='CC'>C.C.</option>
                                            <option value='Pasaporte'>
                                                Passport
                                            </option>
                                            <option value='Identidad'>
                                                Identity
                                            </option>
                                        </select>
                                    </label>
                                    <label>
                                        ID
                                        <br />
                                        <input type='text' name='id' required />
                                    </label>
                                    <label>
                                        Email
                                        <br />
                                        <input
                                            type='email'
                                            name='email'
                                            required
                                        />
                                    </label>
                                    <label>
                                        Telephone
                                        <br />
                                        <input
                                            type='text'
                                            name='tel'
                                            required
                                        />
                                    </label>
                                </div>
                                <div className=''>
                                    <label>
                                        Emergency contact name
                                        <br />
                                        <input
                                            type='text'
                                            name='emergency_name'
                                            required
                                        />
                                    </label>
                                    <label>
                                        Emergency telephone
                                        <br />
                                        <input
                                            type='text'
                                            name='emergency_tel'
                                            required
                                        />
                                    </label>
                                    <hr />
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.{' '}
                                    </p>
                                    <p>
                                        <small>
                                            Persons: {search!.persons}
                                            <br />
                                            Price per night: $
                                            {selectedRoom!.price}
                                            <br />
                                            Taxes: ${selectedRoom!.tax}
                                        </small>
                                        <br />
                                        <b>
                                            Total:&nbsp; $
                                            {selectedRoom!.price +
                                                selectedRoom!.tax}
                                        </b>
                                    </p>
                                    <Button type='submit' variant='secondary'>
                                        Reserve now
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                )}

                <Modal show={message} onHide={handleCloseMessage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Congrats!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Your reservation has been received, you will receive
                            an email with the details.
                        </p>
                    </Modal.Body>
                </Modal>
            </main>
        </>
    );
};

export default Hotelpage;
