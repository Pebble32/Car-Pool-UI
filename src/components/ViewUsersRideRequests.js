// src/components/ViewUsersRideRequests.js
import React, { useEffect, useState } from 'react';
import ApiClient from '../generated-api/src/ApiClient';
import { Table, Button, Spinner, Alert, Container, Modal } from 'react-bootstrap';

const ViewUsersRideRequests = () => {
  const [rideRequests, setRideRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false); // To handle loading state for status changes

  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';

  // Fetch ride requests
  const fetchRideRequests = () => {
    setLoading(true);
    setError(null);
    apiClient.callApi(
      '/ride-requests/user-requests',
      'GET',
      {},
      {},
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
          console.error('Error fetching user ride requests:', error);
          setError('Failed to fetch ride requests.');
          setLoading(false);
        } else {
          try {
            const parsedData = JSON.parse(response.text);
            setRideRequests(parsedData);
          } catch (e) {
            console.error('Error parsing ride requests response:', e);
            setError('Invalid response format.');
          }
          setLoading(false);
        }
      }
    );
  };

  // Handle status change (Cancel or Uncancel)
  const handleChangeRequestStatus = (requestId, newStatus) => {
    if (
      (newStatus === 'CANCELED' &&
        !window.confirm('Are you sure you want to cancel this ride request?')) ||
      (newStatus === 'PENDING' &&
        !window.confirm('Are you sure you want to uncancel this ride request?'))
    ) {
      return;
    }

    setStatusLoading(true);
    setError(null);
    setSuccessMessage(null);

    const requestBody = {
      rideRequestId: requestId,
      status: newStatus,
    };

    apiClient.callApi(
      '/ride-requests/edit-request',
      'PUT',
      {},
      {},
      { 'Content-Type': 'application/json' },
      {},
      JSON.stringify(requestBody),
      [],
      ['application/json'],
      ['application/json'],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error changing ride request status:', error);
          setError('Failed to change ride request status.');
        } else {
          console.log('Ride request status updated successfully');
          setSuccessMessage('Ride request status updated successfully.');
          fetchRideRequests(); // Refresh the list after status change
        }
        setStatusLoading(false);
      }
    );
  };

  // Handle delete request (opens modal)
  const handleDeleteRequest = (requestId) => {
    setSelectedRequestId(requestId);
    setShowDeleteModal(true);
  };

  // Confirm delete request
  const confirmDeleteRequest = () => {
    if (selectedRequestId !== null) {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      apiClient.callApi(
        `/ride-requests/delete-request/${selectedRequestId}`,
        'DELETE',
        {},
        {},
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
            console.error('Error deleting ride request:', error);
            setError('Failed to delete ride request.');
          } else {
            console.log('Ride request deleted successfully');
            setSuccessMessage('Ride request deleted successfully.');
            fetchRideRequests(); // Refresh the list after deleting
          }
          setShowDeleteModal(false);
          setSelectedRequestId(null);
        }
      );
    }
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedRequestId(null);
  };

  useEffect(() => {
    fetchRideRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <h2>My Ride Requests</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Ride Offer ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rideRequests && rideRequests.length > 0 ? (
              rideRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.rideOfferId}</td>
                  <td>{request.requestStatus}</td>
                  <td>
                    {/* Display Cancel or Uncancel button based on status */}
                    {request.requestStatus === 'PENDING' && (
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleChangeRequestStatus(request.id, 'CANCELED')}
                        disabled={statusLoading}
                      >
                        {statusLoading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          'Cancel Request'
                        )}
                      </Button>
                    )}
                    {request.requestStatus === 'CANCELED' && (
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleChangeRequestStatus(request.id, 'PENDING')}
                        disabled={statusLoading}
                      >
                        {statusLoading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          'Uncancel Request'
                        )}
                      </Button>
                    )}
                    {/* Delete Button */}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteRequest(request.id)}
                      disabled={loading}
                    >
                      Delete Request
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No ride requests found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Ride Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this ride request? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteRequest}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewUsersRideRequests;
