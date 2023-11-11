import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { useState, useEffect } from 'react';
import { getHotels } from './data/hotels';
import { Hotel } from './interfaces/hotels';

function App() {
    const [hotels, sethotels] = useState<Hotel[]>([]);

    useEffect(() => {
        getHotels().then((data) => sethotels(data));
    }, []);

    const listHotels = () => {
        const data = hotels;

        return (
            <div>
                <h2>Hotels</h2>
                {data &&
                    data.map((hotel, index) => (
                        <div key={index}>
                            <h3>{hotel.name}</h3>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
                {listHotels()}
            </div>
        </>
    );
}

export default App;
