import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleShowLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar className="navbarCSS" collapseOnSelect expand="lg">
      <Navbar.Brand href="/" className="navTitle">
        Expense Tracker
      </Navbar.Brand>
      
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className="navbar-toggler-custom"
      >
        <span className="navbar-toggler-icon-custom"></span>
      </Navbar.Toggle>
      
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          {user ? (
            <Button 
              variant="primary" 
              onClick={handleShowLogout}
              className="nav-button"
            >
              Logout
            </Button>
          ) : (
            <Button 
              variant="primary" 
              onClick={handleShowLogin}
              className="nav-button"
            >
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;