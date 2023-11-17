import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReservations } from '../data/reservations';
import { Reservation } from '../interfaces/reservations';
import Header from '../layouts/Header.tsx';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Login from './Login';
import useToken from '../data/users';

const Reservationspage = () => {
    const { token, setToken } = useToken();
    const { hotelId } = useParams();
    const [reservations, setreservations] = useState<Reservation[]>([]);
    const [selectedReservation, setselectedReservation] = useState<{
        [key: string]: any;
    }>();
    const [message, setMessage] = useState(false);
    const handleCloseMessage = () => setMessage(false);
    const handleShowMessage = () => setMessage(true);

    useEffect(() => {
        if (!token) {
            return;
        }
        getReservations({ hotelId }).then(
            (data) => data && setreservations(data)
        );
    }, [hotelId, token]);

    if (!token) {
        return <Login setToken={setToken} />;
    }

    const handleClick = (data: Reservation) => {
        handleShowMessage();
        setselectedReservation(data);
    };

    const listReservations = () => {
        const data = reservations;

        return (
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Hotel name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((reservation: Reservation, index) => (
                            <tr key={index}>
                                <td>{reservation.name}</td>
                                <td>{reservation.country}</td>
                                <td>{reservation.city}</td>
                                <td>{reservation.checkin}</td>
                                <td>{reservation.checkout}</td>
                                <td>
                                    <Button
                                        variant='primary'
                                        onClick={() => handleClick(reservation)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        );
    };

    return (
        <>
            <Header />
            <main>
                <h2>Reservations</h2>

                <hr />

                <div>{listReservations()}</div>

                {selectedReservation && (
                    <Modal show={message} onHide={handleCloseMessage}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {selectedReservation.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>Reservation details</h6>
                            <div>ID: {selectedReservation.id}</div>
                            <div>Country: {selectedReservation.country}</div>
                            <div>City: {selectedReservation.city}</div>
                            <div>
                                Reservation: {selectedReservation.checkin} to{' '}
                                {selectedReservation.checkout}
                            </div>

                            <hr />
                            <h6>Room details</h6>
                            <div>Room: {selectedReservation.room.name}</div>
                            <div>Type: {selectedReservation.room.type}</div>
                            <div>Price: {selectedReservation.room.price}</div>
                            <div>Tax: {selectedReservation.room.tax}</div>
                            <hr />
                            <h6>Customer details</h6>
                            <div>
                                Full name: {selectedReservation.user.name}
                            </div>
                            <div>
                                Birth date:{' '}
                                {selectedReservation.user.birth_date}
                            </div>
                            <div>Gender: {selectedReservation.user.gender}</div>
                            <div>
                                ID Type: {selectedReservation.user.id_type}
                            </div>
                            <div>ID: {selectedReservation.user.id}</div>
                            <div>Email: {selectedReservation.user.email}</div>
                            <div>Telephone: {selectedReservation.user.tel}</div>
                            <hr />
                            <h6>Emergency details</h6>
                            <div>
                                Full name:{' '}
                                {selectedReservation.emergency_contact.name}
                            </div>
                            <div>
                                Telephone:{' '}
                                {selectedReservation.emergency_contact.tel}
                            </div>
                        </Modal.Body>
                    </Modal>
                )}
            </main>
        </>
    );
};

export default Reservationspage;
