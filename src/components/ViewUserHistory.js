// src/components/ViewUsersHistory.js

import React, { useEffect, useState } from 'react';
import ApiClient from '../generated-api/src/ApiClient';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Button,
  Spinner,
  Alert,
  Container,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ViewUsersHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false); // To handle loading state for delete actions

  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL'; // Ensure this matches your Swagger server URL

  const navigate = useNavigate();

  // Function to fetch user's ride history manually
  const fetchRideHistory = () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    apiClient.callApi(
      '/offers/user-rideHistory', // Endpoint
      'GET', // Method
      {}, // Path parameters
      {}, // Query parameters
      {}, // Header parameters
      {}, // Form parameters
      null, // Body
      [], // Auth names
      ['application/json'], // Content types
      ['application/json'], // Accepts
      null, // Return type
      null, // Axios config
      (error, data, response) => {
        if (error) {
          console.error('Error fetching ride history:', error);
          setError('Failed to fetch ride history.');
          setLoading(false);
        } else {
          try {
            const parsedData = data || JSON.parse(response.text);
            setRideHistory(parsedData);
          } catch (e) {
            console.error('Error parsing ride history response:', e);
            setError('Invalid response format.');
          }
          setLoading(false);
        }
      }
    );
  };

  // Function to delete a ride offer manually
  const deleteRideOffer = (rideId) => {
    setActionLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Construct the DELETE endpoint with the rideId
    const deleteEndpoint = `/offers/details/${rideId}`;

    apiClient.callApi(
      deleteEndpoint, // Endpoint with path parameter
      'DELETE', // Method
      {}, // Path parameters are already included in the endpoint
      {}, // Query parameters
      {}, // Header parameters
      {}, // Form parameters
      null, // Body
      [], // Auth names
      ['application/json'], // Content types
      ['application/json'], // Accepts
      null, // Return type
      null, // Axios config
      (error, data, response) => {
        if (error) {
          console.error('Error deleting ride offer:', error);
          if (response && response.status === 404) {
            setError('Ride offer not found.');
          } else {
            setError('Failed to delete ride offer.');
          }
        } else {
          console.log('Ride offer deleted successfully');
          setSuccessMessage('Ride offer deleted successfully.');
          fetchRideHistory(); // Refresh the ride history
        }
        setActionLoading(false);
      }
    );
  };

  // Handle edit button click
  const handleEditClick = (ride) => {
    navigate(`/ride-offers/edit/${ride.id}`, { state: { offer: ride } });
  };

  // Handle delete button click
  const handleDeleteClick = (rideId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this ride offer? This action cannot be undone.'
    );
    if (confirmDelete) {
      deleteRideOffer(rideId);
    }
  };

  useEffect(() => {
    fetchRideHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <h2>My Ride History</h2>

      {/* Display error alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display success alert */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {/* Display loading spinner */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Ride Offer ID</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Available Seats</th>
              <th>Departure Time</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rideHistory.length > 0 ? (
              rideHistory.map((ride) => (
                <tr key={ride.id}>
                  <td>{ride.id}</td>
                  <td>{ride.startLocation}</td>
                  <td>{ride.endLocation}</td>
                  <td>{ride.availableSeats}</td>
                  <td>{new Date(ride.departureTime).toLocaleString()}</td>
                  <td>{ride.status}</td>
                  <td>{new Date(ride.createdAt).toLocaleDateString()}</td>
                  <td>
                    {/* Edit Button */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-edit-${ride.id}`}>Edit Ride Offer</Tooltip>}
                    >
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditClick(ride)}
                        disabled={actionLoading}
                      >
                        <FaEdit />
                      </Button>
                    </OverlayTrigger>

                    {/* Delete Button */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-delete-${ride.id}`}>Delete Ride Offer</Tooltip>}
                    >
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteClick(ride.id)}
                        disabled={actionLoading}
                      >
                        <FaTrash />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No ride history found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewUsersHistory;
