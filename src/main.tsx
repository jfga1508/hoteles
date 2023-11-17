import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Hotelpage from './pages/Hotel.tsx';
import './index.scss';
import Home from './pages/Home.tsx';
import Adminpage from './admin/Adminpage.tsx';
import Reservationspage from './admin/Reservationspage.tsx';
import Hoteladd from './admin/Hoteladd.tsx';
import Hoteledit from './admin/Hoteledit.tsx';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
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
        path: '/admin/add/hotel',
        element: <Hoteladd />,
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
        <header className='mb-4 px-4 bg-light'>
            <Navbar expand='lg' className='bg-body-tertiary'>
                <Navbar.Brand href='/'>Hotels App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <NavDropdown title='Admin' id='basic-nav-dropdown'>
                            <NavDropdown.Item href='/admin'>
                                Hotels
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/admin/reservations'>
                                Reservations
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/admin/add/hotel'>
                                Add hotel
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
        <main>
            <RouterProvider router={router} />
        </main>
    </React.StrictMode>
);
