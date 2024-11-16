// src/components/RideOfferEdit.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiClient from '../generated-api/src/ApiClient';
import RideOfferApi from '../generated-api/src/api/RideOfferApi';

const RideOfferEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state;
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const rideOfferApi = new RideOfferApi(apiClient);

  const [updatedOffer, setUpdatedOffer] = useState({
    ...offer,
    rideId: offer.rideId || offer.id, // Add rideId to the updated offer
    rideStatus: offer.rideStatus || 'AVAILABLE', // Add rideStatus to the updated offer with a default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOfferWithId = {
      ...updatedOffer,
      rideId: updatedOffer.rideId || offer.rideId || offer.id, // Ensure rideId is included in the request
    };
    rideOfferApi.editRideOfferDetails(updatedOfferWithId, (error, data, response) => {
      if (error) {
        console.error('Error updating ride offer:', error);
      } else {
        console.log('Ride offer updated successfully');
        navigate('/ride-offers');
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Ride Offer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Start Location</label>
          <input
            type="text"
            className="form-control"
            name="startLocation"
            value={updatedOffer.startLocation}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Location</label>
          <input
            type="text"
            className="form-control"
            name="endLocation"
            value={updatedOffer.endLocation}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Departure Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="departureTime"
            value={new Date(updatedOffer.departureTime).toISOString().slice(0, 16)}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Available Seats</label>
          <input
            type="number"
            className="form-control"
            name="availableSeats"
            value={updatedOffer.availableSeats}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ride Status</label>
          <select
            className="form-control"
            name="rideStatus"
            value={updatedOffer.rideStatus}
            onChange={handleChange}
          >
            <option value="AVAILABLE">Available</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/ride-offers')}>Cancel</button>
      </form>
    </div>
  );
};

export default RideOfferEdit;
