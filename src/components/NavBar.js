import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
        
    <Container fluid>
      <Navbar.Brand href="/" style={{color: 'rgb(255, 232, 181)'}}>
        <img className="logo1" src="image/123.png" alt="/"/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          
          <Nav.Link href="/about" style={{color: 'rgb(255, 232, 181)'}}>About</Nav.Link>
          <Nav.Link href="/calendar" style={{color: 'rgb(255, 232, 181)'}}>Calendar</Nav.Link>
          <Nav.Link href="/becomeamember" style={{color: 'rgb(255, 232, 181)'}}>Member</Nav.Link>
          <Nav.Link href="/history" style={{color: 'rgb(255, 232, 181)'}}>History</Nav.Link>
          <Nav.Link href="/newsletters" style={{color: 'rgb(255, 232, 181)'}}>Newsletters</Nav.Link>
          <Nav.Link href="/contacts" style={{color: 'rgb(255, 232, 181)'}}>Contacts</Nav.Link>
          <Nav.Link href="/gallery" style={{color: 'rgb(255, 232, 181)'}}>Gallery</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar