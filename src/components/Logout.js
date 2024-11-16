import React from 'react';
import ApiClient from '../generated-api/src/ApiClient';
import AuthApi from '../generated-api/src/api/AuthenticationRegistrationApi';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const authApi = new AuthApi(apiClient);
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout((error, data, response) => {
      if (error) {
        console.error('Logout failed:', error);
      } else {
        console.log('Logout successful:', data);
        navigate('/login'); // Redirect to login after logout
      }
    });
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary mt-3">Logout</button>
  );
};

export default Logout;
