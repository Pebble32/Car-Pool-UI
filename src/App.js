// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import RideOffers from './components/RideOffers';
import RideOfferDetails from './components/RideOfferDetails';
import RideOfferEdit from './components/RideOfferEdit';
import Navigation from './components/Navigation';
import CreateRideOffer from './components/CreateRideOffer';
import ViewUserRideRequests from './components/ViewUsersRideRequests';
import Home from './components/Home';
import ProfileManagement from './components/ProfileManagment';
import ViewUsersHistory from './components/ViewUserHistory';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/ride-offers" element={<RideOffers />} />
            <Route path="/ride-offers/:id" element={<RideOfferDetails />} />
            <Route path="/ride-offers/edit/:id" element={<RideOfferEdit />} />
            <Route path="/my-ride-offers" element={<ViewUsersHistory />} />
            <Route path="/my-ride-requests" element={<ViewUserRideRequests />} />
            <Route path="/create-ride-offer" element={<CreateRideOffer />} />
            <Route path="/profile-managment" element={<ProfileManagement />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
