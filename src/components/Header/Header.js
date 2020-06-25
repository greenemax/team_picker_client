import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="My Account" id="basic-nav-dropdown">
      <NavDropdown.Item href="#change-password"><Nav.Link href="#change-password">Change Password</Nav.Link></NavDropdown.Item>
      <NavDropdown.Item href="#sign-out"><Nav.Link href="#sign-out">Sign Out</Nav.Link></NavDropdown.Item>
      <NavDropdown.Item href="#get-history"><Nav.Link href="#get-history">View Past Lineups</Nav.Link></NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#lineup">My Lineup</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#players">Players</Nav.Link>
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
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
