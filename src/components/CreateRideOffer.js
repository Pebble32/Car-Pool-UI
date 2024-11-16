// src/components/CreateRideOffer.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../generated-api/src/ApiClient';
import RideOfferApi from '../generated-api/src/api/RideOfferApi';
import RideOfferRequest from '../generated-api/src/model/RideOfferRequest';

const CreateRideOffer = () => {
  const navigate = useNavigate();
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const rideOfferApi = new RideOfferApi(apiClient);

  const [newOffer, setNewOffer] = useState({
    startLocation: '',
    endLocation: '',
    departureTime: '',
    availableSeats: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rideOfferRequest = new RideOfferRequest();
    rideOfferRequest.startLocation = newOffer.startLocation;
    rideOfferRequest.endLocation = newOffer.endLocation;
    rideOfferRequest.departureTime = new Date(newOffer.departureTime).toISOString();
    rideOfferRequest.availableSeats = parseInt(newOffer.availableSeats, 10);

    rideOfferApi.createRideOffer(rideOfferRequest, (error, data, response) => {
      if (error) {
        console.error('Error creating ride offer:', error);
      } else {
        console.log('Ride offer created successfully');
        navigate('/ride-offers');
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Create Ride Offer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Start Location</label>
          <input
            type="text"
            className="form-control"
            name="startLocation"
            value={newOffer.startLocation}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Location</label>
          <input
            type="text"
            className="form-control"
            name="endLocation"
            value={newOffer.endLocation}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Departure Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="departureTime"
            value={newOffer.departureTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Available Seats</label>
          <input
            type="number"
            className="form-control"
            name="availableSeats"
            value={newOffer.availableSeats}
            min="1"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Ride Offer</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/ride-offers')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateRideOffer;
