import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
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
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link href="/about" style={{color: 'rgb(255, 232, 181)'}}><strong>About</strong></Nav.Link>
          <Nav.Link href="/calendar" style={{color: 'rgb(255, 232, 181)'}}><strong>Calendar</strong></Nav.Link>
          <Nav.Link href="/becomeamember" style={{color: 'rgb(255, 232, 181)'}}><strong>Member</strong></Nav.Link>
          <Nav.Link href="/newsletters" style={{color: 'rgb(255, 232, 181)'}}><strong>Newsletters</strong></Nav.Link>
          <Nav.Link href="/contacts" style={{color: 'rgb(255, 232, 181)'}}><strong>Contacts</strong></Nav.Link>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" style={{color: 'rgb(255, 232, 181)'}}>
              <strong>Gallery</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/gallery" style={{color: '#56cc9d'}}><strong>Plants</strong></Dropdown.Item>
              <Dropdown.Item href="/eventgallery" style={{color: '#56cc9d'}}><strong>Events</strong></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Link href="/PrivacyPolicy" style={{color: 'rgb(255, 232, 181)'}}><strong>Privacy Policy</strong></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar