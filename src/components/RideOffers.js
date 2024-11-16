// src/components/RideOffers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../generated-api/src/ApiClient';
import RideOfferApi from '../generated-api/src/api/RideOfferApi';
import { Button, Dropdown, ButtonGroup, Alert, Spinner, Form } from 'react-bootstrap';

const RideOffers = () => {
  const navigate = useNavigate();
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';
  const rideOfferApi = new RideOfferApi(apiClient);

  const [rideOffers, setRideOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterStartLocation, setFilterStartLocation] = useState('');
  const [filterEndLocation, setFilterEndLocation] = useState('');
  const [filterDepartureTime, setFilterDepartureTime] = useState('');

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchRideOffers(currentPage, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]);

  const fetchCurrentUser = () => {
    apiClient.callApi(
      '/auth/check',
      'GET',
      {},
      {},
      {},
      {},
      null,
      [],
      ['text/plain'],
      ['text/plain'],
      null,
      null,
      (error, data, response) => {
        if (error || !response.text) {
          console.error('Error checking current user:', error);
          setError('Failed to fetch current user.');
          setLoading(false);
        } else {
          setCurrentUser(response.text);
          setLoading(false);
        }
      }
    );
  };

  const fetchRideOffers = (page, size) => {
    setLoading(true);
    setError(null); // Reset error state

    if (searchKeyword.trim() !== '') {
      // Search functionality
      console.log('Performing search with keyword:', searchKeyword.trim());
      rideOfferApi.searchForRides(
        searchKeyword.trim(),
        { page, size },
        (error, data, response) => {
          if (error) {
            console.error('Error searching ride offers:', error);
            setError('Failed to search ride offers.');
          } else {
            console.log('Search API response:', data);
            setRideOffers(data.content || []);
            setCurrentPage(data.number || 0);
            setTotalPages(data.totalPages || 0);
            setFirstPage(data.first);
            setLastPage(data.last);
          }
          setLoading(false);
        }
      );
    } else if (
      filterStartLocation.trim() !== '' ||
      filterEndLocation.trim() !== '' ||
      filterDepartureTime.trim() !== ''
    ) {
      // Filter functionality
      const queryParams = {
        page,
        size,
      };

      if (filterStartLocation.trim() !== '') queryParams.startLocation = filterStartLocation.trim();
      if (filterEndLocation.trim() !== '') queryParams.endLocation = filterEndLocation.trim();

      if (filterDepartureTime.trim() !== '') {
        // Use the input value directly, ensuring it includes seconds set to "00"
        queryParams.departureTime = `${filterDepartureTime.trim()}:00`;
      }

      // Debugging: Log the query parameters
      console.log('Filter Query Params:', queryParams);

      rideOfferApi.filterRideOffers(
        queryParams,
        (error, data, response) => {
          if (error) {
            console.error('Error filtering ride offers:', error);
            setError('Failed to filter ride offers.');
          } else if (data) {
            console.log('Filter API response:', data);
            setRideOffers(data.content || []);
            setCurrentPage(data.number || 0);
            setTotalPages(data.totalPages || 0);
            setFirstPage(data.first);
            setLastPage(data.last);
          } else {
            console.error('Filter API returned null data.');
            setError('Failed to filter ride offers. No data returned.');
          }
          setLoading(false);
        }
      );
    } else {
      // Default: Fetch all ride offers paginated
      console.log('Fetching all ride offers with pagination:', { page, size });
      rideOfferApi.findAllRideOffersPaginated(
        { page, size },
        (error, data, response) => {
          if (error) {
            console.error('Error fetching ride offers:', error);
            setError('Failed to fetch ride offers.');
          } else {
            console.log('Fetch All API response:', data);
            setRideOffers(data.content || []);
            setCurrentPage(data.number || 0);
            setTotalPages(data.totalPages || 0);
            setFirstPage(data.first);
            setLastPage(data.last);
          }
          setLoading(false);
        }
      );
    }
  };

  const handleViewDetails = (offer) => {
    const isOwner =
      currentUser && currentUser.toLowerCase() === offer.creatorEmail.toLowerCase();
    navigate(`/ride-offers/${offer.id}`, { state: { offer, isOwner } });
  };

  const handleRequestToJoin = (offer) => {
    const requestPayload = {
      rideOfferId: offer.id,
    };
    apiClient.callApi(
      '/ride-requests/create',
      'POST',
      {},
      {},
      { 'Content-Type': 'application/json' }, // Set the header
      {},
      requestPayload,
      [],
      ['application/json'],
      ['application/json'],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error requesting to join ride offer:', error);
          setError('Failed to request to join ride offer.');
        } else {
          console.log('Request to join ride offer sent successfully:', data);
          setSuccessMessage('Request to join ride offer sent successfully.');
          fetchRideOffers(currentPage, pageSize);
        }
      }
    );
  };

  const handleDelete = (rideOfferId) => {
    if (window.confirm('Are you sure you want to delete this ride offer?')) {
      rideOfferApi.deleteRideOffer(rideOfferId, (error, data, response) => {
        if (error) {
          console.error('Error deleting ride offer:', error);
          setError('Failed to delete ride offer.');
        } else {
          console.log('Ride offer deleted successfully');
          // Refresh the ride offers list
          fetchRideOffers(currentPage, pageSize);
        }
      });
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(0); // Reset to first page when page size changes
  };

  const handleFirstPage = () => {
    if (!firstPage) {
      setCurrentPage(0);
    }
  };

  const handlePreviousPage = () => {
    if (!firstPage) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  };

  const handleNextPage = () => {
    if (!lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLastPage = () => {
    if (!lastPage) {
      setCurrentPage(totalPages - 1);
    }
  };

  const handleSearchKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleFilterStartLocationChange = (e) => {
    setFilterStartLocation(e.target.value);
  };

  const handleFilterEndLocationChange = (e) => {
    setFilterEndLocation(e.target.value);
  };

  const handleFilterDepartureTimeChange = (e) => {
    setFilterDepartureTime(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchRideOffers(0, pageSize);
  };

  const handleFilter = () => {
    setCurrentPage(0);
    fetchRideOffers(0, pageSize);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Ride Offers</h2>
        <Dropdown
          as={ButtonGroup}
          onSelect={(e) => handlePageSizeChange(Number(e))}
        >
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Page Size: {pageSize}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="5">5</Dropdown.Item>
            <Dropdown.Item eventKey="10">10</Dropdown.Item>
            <Dropdown.Item eventKey="20">20</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by keyword"
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Filter Fields */}
      <Form>
        <div className="row mb-3">
          <div className="col">
            <Form.Control
              type="text"
              placeholder="Start Location"
              value={filterStartLocation}
              onChange={handleFilterStartLocationChange}
            />
          </div>
          <div className="col">
            <Form.Control
              type="text"
              placeholder="End Location"
              value={filterEndLocation}
              onChange={handleFilterEndLocationChange}
            />
          </div>
          <div className="col">
            <Form.Control
              type="datetime-local"
              placeholder="Departure Time"
              value={filterDepartureTime}
              onChange={handleFilterDepartureTimeChange}
              step="60" // Allows selecting only minutes; seconds set to "00"
            />
          </div>
          <div className="col">
            <Button variant="outline-secondary" onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </div>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : rideOffers.length > 0 ? (
        <div className="list-group">
          {rideOffers.map((offer) => (
            <div
              key={offer.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleViewDetails(offer)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">
                    Ride from {offer.startLocation} to {offer.endLocation}
                  </h5>
                  <p className="mb-1">
                    Departure Time: {new Date(offer.departureTime).toLocaleString()}
                  </p>
                  <p className="mb-1">Available Seats: {offer.availableSeats}</p>
                </div>
                <div>
                  {currentUser &&
                  currentUser.toLowerCase() === offer.creatorEmail.toLowerCase() ? (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/ride-offers/edit/${offer.id}`, { state: { offer } });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(offer.id);
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestToJoin(offer);
                      }}
                    >
                      Request to Join
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Alert variant="info">No ride offers found.</Alert>
      )}
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="secondary"
          size="sm"
          className="me-2"
          onClick={handleFirstPage}
          disabled={firstPage}
        >
          &lt;&lt;
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="me-2"
          onClick={handlePreviousPage}
          disabled={firstPage}
        >
          &lt;
        </Button>
        {[...Array(totalPages).keys()].map((pageNumber) =>
          pageNumber === currentPage ||
          pageNumber === currentPage - 1 ||
          pageNumber === currentPage + 1 ? (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? 'primary' : 'secondary'}
              size="sm"
              className="me-2"
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber + 1}
            </Button>
          ) : null
        )}
        <Button
          variant="secondary"
          size="sm"
          className="me-2"
          onClick={handleNextPage}
          disabled={lastPage}
        >
          &gt;
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLastPage}
          disabled={lastPage}
        >
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
};

export default RideOffers;
