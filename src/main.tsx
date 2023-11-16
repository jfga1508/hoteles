import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Hotelpage from './pages/Hotel.tsx';
import './index.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/hotel/:hotelId',
        element: <Hotelpage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
