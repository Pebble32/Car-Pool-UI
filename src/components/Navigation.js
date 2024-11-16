// src/components/Navigation.js
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Image, Spinner } from 'react-bootstrap';
import ApiClient from '../generated-api/src/ApiClient';
import { AuthContext } from '../context/AuthContext';
import { DEFAULT_PROFILE_PICTURE } from '../constants'; // Import the default profile picture

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName, profilePicture, setProfilePicture } = useContext(AuthContext);
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';

  const checkLoginStatus = () => {
    apiClient.callApi(
      '/auth/check',
      'GET',
      {},
      {},
      {},
      {},
      null,
      [],
      [], // No expected response types
      [],
      null,
      null,
      (error, data, response) => {
        if (error || !response || !response.text) {
          setIsLoggedIn(false);
        } else {
          const userEmail = response.text.trim();
          if (userEmail.length > 0) {
            setIsLoggedIn(true);
            setUserName(userEmail.split('@')[0]);
            // Fetch the profile picture
            fetchProfilePicture();
          } else {
            setIsLoggedIn(false);
          }
        }
      }
    );
  };

  const fetchProfilePicture = () => {
    apiClient.callApi(
      '/users/profile-picture',
      'GET',
      {},
      {},
      {},
      {},
      null,
      [],
      [], // No expected response types
      [],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error fetching profile picture:', error);
          setProfilePicture(null); // Optionally, set to null or a default image
        } else {
          try {
            const base64String = response.text.trim();
            setProfilePicture(base64String);
          } catch (e) {
            console.error('Error handling profile picture response:', e);
            setProfilePicture(null);
          }
        }
      }
    );
  };

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    apiClient.callApi(
      '/auth/logout',
      'POST',
      {},
      {},
      {},
      {},
      null,
      [],
      [], // No expected response types
      [],
      null,
      null,
      (error, data, response) => {
        if (!error) {
          setIsLoggedIn(false);
          setUserName('');
          setProfilePicture(null);
        }
      }
    );
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">CarPool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/ride-offers">Ride Offers</Nav.Link>
            <Nav.Link as={Link} to="/create-ride-offer">Create Ride Offer</Nav.Link>
            {isLoggedIn ? (
              <NavDropdown 
                title={
                  profilePicture ? (
                    <Image 
                      src={`data:image/jpeg;base64,${profilePicture}`} // Adjust MIME type if necessary
                      roundedCircle 
                      width={30} 
                      height={30} 
                      alt="Profile" 
                      className="me-2"
                    />
                  ) : (
                    <Image 
                      src={DEFAULT_PROFILE_PICTURE} // Use the default profile picture
                      roundedCircle 
                      width={30} 
                      height={30} 
                      alt="Profile Placeholder" 
                      className="me-2"
                    />
                  )
                } 
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile-managment">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-ride-requests">My Ride Requests</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-ride-offers">My Ride Offers</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
