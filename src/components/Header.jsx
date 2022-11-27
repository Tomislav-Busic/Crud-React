import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <Navbar bg="light" variant="light" fixed='top'>
        <Container>
          <Navbar.Brand href="#home">CRUD</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={ Link } to="/">Home</Nav.Link>
            <Nav.Link as={ Link } to="/users">Users</Nav.Link>
            <Nav.Link as={ Link } to="/create">Create</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;