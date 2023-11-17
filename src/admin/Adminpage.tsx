import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHotels } from '../data/hotels';
import { Hotel } from '../interfaces/hotels';
import Header from '../layouts/Header.tsx';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Login from './Login';
import useToken from '../data/users';

const Adminpage = () => {
    const { token, setToken } = useToken();

    const [hotels, sethotels] = useState<Hotel[]>([]);
    const [search, setsearch] = useState({
        city: '',
    });

    useEffect(() => {
        if (!token) {
            return;
        }
        getHotels(search).then((data) => sethotels(data));
    }, [token]);

    if (!token) {
        return <Login setToken={setToken} />;
    }

    const handleClick = () => {
        getHotels(search).then((data) => sethotels(data));
    };

    const listHotels = () => {
        const data = hotels;

        return (
            <Table striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Hotel name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Rooms</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((hotel, index) => (
                            <tr key={index}>
                                <td>{hotel.name}</td>
                                <td>{hotel.country}</td>
                                <td>{hotel.city}</td>
                                <td>{hotel.rooms.length}</td>
                                <td>
                                    <Link
                                        className='btn btn-primary me-3'
                                        to={`/admin/reservations/${hotel.id}`}
                                        relative='path'
                                    >
                                        Reservations
                                    </Link>
                                    <Link
                                        className='btn btn-primary'
                                        to={`/admin/hotel/${hotel.id}`}
                                        relative='path'
                                    >
                                        Edit
                                    </Link>
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
                <h2>Hotels</h2>

                <Link className='mb-3 btn btn-primary' to='/admin/add/hotel'>
                    Add a hotel
                </Link>

                <form className='search justify-content-center flex-wrap'>
                    <div className='search_group'>
                        <label htmlFor='city'>City</label>
                        <input
                            type='text'
                            id='city'
                            name='city'
                            placeholder='City'
                            onChange={(e) =>
                                setsearch({ ...search, city: e.target.value })
                            }
                        />
                    </div>
                    <div className='search_group justify-content-end'>
                        <Button variant='primary' onClick={() => handleClick()}>
                            Search
                        </Button>
                    </div>
                </form>
                <hr />

                <div>{listHotels()}</div>
            </main>
        </>
    );
};

export default Adminpage;
