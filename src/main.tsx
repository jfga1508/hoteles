import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Hotelpage from './pages/Hotel.tsx';
import './index.scss';
import Adminpage from './admin/Adminpage.tsx';
import Reservationspage from './admin/Reservationspage.tsx';
import Hoteladmin from './admin/Hoteladmin.tsx';
import Hoteledit from './admin/Hoteledit.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/hotel/:hotelId',
        element: <Hotelpage />,
    },
    {
        path: '/admin',
        element: <Adminpage />,
    },
    {
        path: '/admin/hotel/add',
        element: <Hoteladmin />,
    },
    {
        path: '/admin/hotel/:hotelId',
        element: <Hoteledit />,
    },
    {
        path: '/admin/reservations/',
        element: <Reservationspage />,
    },
    {
        path: '/admin/reservations/:hotelId',
        element: <Reservationspage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
