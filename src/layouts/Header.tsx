import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <header className='mb-4 px-4 bg-light'>
            <Navbar expand='lg' className='bg-body-tertiary'>
                <Navbar.Brand href='/'>Hotels App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} to='/'>
                            Home
                        </Nav.Link>
                        <NavDropdown title='Admin' id='basic-nav-dropdown'>
                            <NavDropdown.Item as={Link} to='/admin'>
                                Hotels
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to='/admin/reservations'
                            >
                                Reservations
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to='/admin/add/hotel'>
                                Add hotel
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};
export default Header;
