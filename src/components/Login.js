// src/components/Login.js
import React, { useState, useContext } from 'react';
import ApiClient from '../generated-api/src/ApiClient';
import AuthApi from '../generated-api/src/api/AuthenticationRegistrationApi';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserName, setProfilePicture } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Loading state for login
  const [error, setError] = useState(null); // Error state for login

  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const authApi = new AuthApi(apiClient);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const authenticationRequest = { email, password };

    try {
      // Authenticate the user
      authApi.authenticate(authenticationRequest, async (error, data) => {
        if (error) {
          console.error('Login failed:', error);
          setError('Invalid credentials');
          setLoading(false);
        } else {
          setIsLoggedIn(true);
          setUserName(email.split('@')[0]);

          // Fetch and set the profile picture
          await fetchProfilePicture();

          setLoading(false);
          navigate('/ride-offers');
        }
      });
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const fetchProfilePicture = () => {
    return new Promise((resolve) => {
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
            resolve();
          } else {
            try {
              const base64String = response.text.trim();
              setProfilePicture(base64String);
            } catch (e) {
              console.error('Error handling profile picture response:', e);
              setProfilePicture(null);
            }
            resolve();
          }
        }
      );
    });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={loading} // Disable input while loading
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading} // Disable input while loading
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Login'}
        </button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
