import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHotels } from '../data/hotels';
import { Hotel } from '../interfaces/hotels';
import Button from 'react-bootstrap/Button';
import Header from '../layouts/Header.tsx';

function Home() {
    const [hotels, sethotels] = useState<Hotel[]>([]);
    const [search, setsearch] = useState({
        city: '',
        from: '',
        to: '',
        persons: 1,
    });

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    useEffect(() => {
        const params = {
            ...search,
            from: `${yyyy}-${mm}-${dd}`,
            to: `${yyyy}-${mm}-${dd + 1}`,
        };
        setsearch(params);
        getHotels(params).then((data) => data && sethotels(data));
    }, []);

    const handleClick = () => {
        getHotels(search).then((data) => data && sethotels(data));
    };

    const listHotels = () => {
        const data = hotels;

        return (
            <>
                <Header />
                <main>
                    <h1>Hotels</h1>

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
                                    setsearch({
                                        ...search,
                                        from: e.target.value,
                                    })
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
                            <label htmlFor='city'>City</label>
                            <input
                                type='text'
                                name='city'
                                id='city'
                                placeholder='City'
                                onChange={(e) =>
                                    setsearch({
                                        ...search,
                                        city: e.target.value,
                                    })
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
                        <div className='search_group justify-content-end'>
                            <Button
                                variant='primary'
                                onClick={() => handleClick()}
                            >
                                Search
                            </Button>
                        </div>
                    </form>
                    <hr />
                    <div className='hotels flex-wrap'>
                        {data &&
                            data.map((hotel, index) => (
                                <div className='border p-2' key={index}>
                                    <h3>{hotel.name}</h3>
                                    <h6 className='text-capitalize'>
                                        {hotel.country}, {hotel.city}
                                    </h6>
                                    <p>Starting from ${hotel.rooms[0].price}</p>
                                    {hotel.isEnabled ? (
                                        <Link
                                            className='btn btn-primary'
                                            to={`/hotel/${hotel.id}?from=${search.from}&to=${search.to}&persons=${search.persons}`}
                                            relative='path'
                                        >
                                            Check rooms
                                        </Link>
                                    ) : (
                                        'Not available'
                                    )}
                                </div>
                            ))}
                    </div>
                </main>
            </>
        );
    };

    return (
        <>
            <div>{listHotels()}</div>
        </>
    );
}

export default Home;
