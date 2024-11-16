// src/components/Register.js
import React, { useState } from 'react';
import ApiClient from '../generated-api/src/ApiClient';
import AuthApi from '../generated-api/src/api/AuthenticationRegistrationApi';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    phoneNumber: ''
  });

  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const authApi = new AuthApi(apiClient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    authApi.register(formData, (error, data) => {
      if (error) {
        console.error('Registration failed:', error);
        alert('Registration failed');
      } else {
        console.log('Registration successful:', data);
        alert('Registration successful!');
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" className="form-control" name="firstname" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" className="form-control" name="lastname" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" className="form-control" name="phoneNumber" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
