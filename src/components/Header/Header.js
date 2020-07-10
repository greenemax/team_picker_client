import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="Lineups" id="basic-nav-dropdown">
      <NavDropdown.Item href="#create-lineup/">New Lineup</NavDropdown.Item>
      <NavDropdown.Item href="#lineups/"> View Lineups</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="My Account" id="basic-nav-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="navBar" expand="md">
    <Navbar.Brand style={{ color: '#ffffff' }} className="navBar">
      <strong>DREAM TEAM</strong>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
