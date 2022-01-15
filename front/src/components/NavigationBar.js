import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavigationBar = (props)=>{

    return(
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/AddWorker">AddWorker</Nav.Link>
        <Nav.Link href="DeleteWorker">DeleteWorker</Nav.Link>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}
export default NavigationBar