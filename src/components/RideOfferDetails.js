// src/components/RideOfferDetails.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiClient from '../generated-api/src/ApiClient';
import RideOfferApi from '../generated-api/src/api/RideOfferApi';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';

const RideOfferDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { offer } = location.state;
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const rideOfferApi = new RideOfferApi(apiClient);

  const [isOwner, setIsOwner] = useState(false);
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = () => {
    // Fetch the current user's email and compare it with the creatorEmail of the offer to determine ownership
    apiClient.callApi('/auth/check', 'GET', {}, {}, {}, {}, null, [], ['text/plain'], ['text/plain'], null, null, (error, data, response) => {
      console.log('Full Response:', response);
      console.log('Parsed Data:', data);
      if (error || !response.text) {
        console.error('Error checking current user:', error);
        setError('Failed to fetch current user.');
      } else {
        // Since the backend returns only the email as a plain string, use it directly
        const userEmail = response.text;
        console.log('Current user email:', userEmail);
        if (userEmail.toLowerCase() === offer.creatorEmail.toLowerCase()) {
          setIsOwner(true);
          fetchRideRequests();
        }
      }
      setLoading(false);
    });
  };

  useState(() => {
    fetchCurrentUser();
  });

  const fetchRideRequests = () => {
    // Fetch ride requests for this ride offer if the user is the owner
    rideOfferApi.apiClient.callApi(
      '/ride-requests/requests/paginated',
      'GET',
      {},
      { rideOfferId: offer.id, page: 0, size: 10 },
      {},
      {},
      null,
      [],
      ['application/json'],
      ['application/json'],
      null,
      null,
      (error, data, response) => {
        console.log('Full Response for Ride Requests:', response);
        if (error) {
          console.error('Error fetching ride requests:', error);
          setError('Failed to fetch ride requests.');
        } else {
          const parsedData = JSON.parse(response.text);
          console.log('Ride requests fetched successfully:', parsedData);
          // Extracting ride requests from the response body
          if (parsedData && parsedData.content) {
            setRideRequests(parsedData.content);
          } else {
            console.error('Unexpected response format:', parsedData);
          }
        }
      }
    );
  };

  const handleEdit = () => {
    navigate(`/ride-offers/edit/${offer.id}`, { state: { offer } });
  };

  const handleDelete = () => {
    rideOfferApi.deleteRideOffer(offer.id, (error, data, response) => {
      if (error) {
        console.error('Error deleting ride offer:', error);
        setError('Failed to delete ride offer.');
      } else {
        console.log('Ride offer deleted successfully');
        navigate('/ride-offers');
      }
    });
  };

  const handleRequestToJoin = () => {
    const requestPayload = {
      rideOfferId: offer.id,
      requestStatus: 'PENDING',
    };
    apiClient.callApi('/ride-requests/create', 'POST', {}, {}, {}, {}, requestPayload, [], ['application/json'], ['application/json'], null, null, (error, data, response) => {
      if (error) {
        console.error('Error requesting to join ride offer:', error);
        setError('Failed to request to join ride offer.');
      } else {
        console.log('Request to join ride offer sent successfully');
        navigate('/ride-offers');
      }
    });
  };

  const handleAnswerRequest = (requestId, answerStatus) => {
    const requestPayload = {
      rideRequestId: requestId,
      answerStatus: answerStatus,
    };
    apiClient.callApi('/ride-requests/answer', 'PUT', {}, {}, {}, {}, requestPayload, [], ['application/json'], ['application/json'], null, null, (error, data, response) => {
      if (error) {
        console.error('Error updating ride request:', error);
        setError('Failed to update ride request status.');
      } else {
        console.log(`Ride request ${answerStatus.toLowerCase()} successfully`);
        fetchRideRequests();
        fetchCurrentRideDetails();
      }
    });
  };

  const fetchCurrentRideDetails = () => {
    // Fetch the current ride offer details again to update seat count, etc.
    rideOfferApi.apiClient.callApi(
      `/offers/details`,
      'GET',
      {},
      { ID: offer.id },
      {},
      {},
      null,
      [],
      ['application/json'],
      ['application/json'],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error fetching ride offer details:', error);
          setError('Failed to fetch updated ride offer details.');
        } else {
          const updatedOffer = JSON.parse(response.text);
          console.log('Ride offer details updated successfully:', updatedOffer);
          Object.assign(offer, updatedOffer);
        }
      }
    );
  };

  return (
    <div className="container mt-5">
      <h2>Ride Offer Details</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ride from {offer.startLocation} to {offer.endLocation}</h5>
              <p className="card-text">Departure Time: {new Date(offer.departureTime).toLocaleString()}</p>
              <p className="card-text">Available Seats: {offer.availableSeats}</p>
              <p className="card-text">Status: {offer.status}</p>
              <p className="card-text">Creator Email: {offer.creatorEmail}</p>
            </div>
          </div>
          {isOwner ? (
            <div className="mt-3">
              <Button variant="primary" className="me-2" onClick={handleEdit}>Edit</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
              <div className="mt-4">
                <h4>Ride Requests</h4>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Requester Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rideRequests.length > 0 ? (
                      rideRequests.map((request) => (
                        <tr key={request.id}>
                          <td>{request.requesterEmail}</td>
                          <td>{request.requestStatus}</td>
                          <td>
                            {request.requestStatus === 'PENDING' && (
                              <>
                                <Button variant="success" size="sm" className="me-2" onClick={() => handleAnswerRequest(request.id, 'ACCEPTED')}>Accept</Button>
                                <Button variant="danger" size="sm" onClick={() => handleAnswerRequest(request.id, 'REJECTED')}>Reject</Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No ride requests found.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              <Button variant="success" onClick={handleRequestToJoin}>Request to Join</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RideOfferDetails;
