import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';


const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(AppContext);

  return (
    <div>
      <Navbar 
        bg={ darkTheme  ? 'dark' : 'light' } 
        variant={ darkTheme  ? 'dark' : 'light' }  
        fixed='top'>
        <Container>
          <Navbar.Brand href="#home">CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={ Link } to="/">Home</Nav.Link>
            <Nav.Link as={ Link } to="/users">Users</Nav.Link>
            <Nav.Link as={ Link } to="/create">Create</Nav.Link>
            <div class="form-check form-switch">
              <input className="form-check-input m-2" 
                   type="checkbox" 
                   role="switch"
                   onClick={() => {
                    setDarkTheme(!darkTheme)
                   }} />
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;