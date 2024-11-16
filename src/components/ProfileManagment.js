// src/components/ProfileManagement.js
import React, { useEffect, useState, useContext } from 'react';
import ApiClient from '../generated-api/src/ApiClient';
import { Form, Button, Spinner, Alert, Container, Row, Col, Image } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const ProfileManagement = () => {
  const { setProfilePicture, profilePicture } = useContext(AuthContext); // Destructure both setProfilePicture and profilePicture

  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPicture, setLoadingPicture] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // States for editing user info
  const [infoChanges, setChanges] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [editLoading, setEditLoading] = useState(false);
  
  // States for changing password
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  const apiClient = new ApiClient();
  apiClient.basePath = 'process.env.REACT_APP_BACKEND_URL';

  useEffect(() => {
    fetchUserInfo();
    fetchProfilePicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch user information
  const fetchUserInfo = () => {
    setLoadingUser(true);
    setError(null);
    apiClient.callApi(
      '/auth/get-user',
      'GET',
      {},
      {},
      {},
      {},
      null,
      [],
      [], // No expected content types specified
      [],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error fetching user info:', error);
          setError('Failed to fetch user information.');
          setLoadingUser(false);
        } else {
          try {
            // Assuming server returns JSON object
            const parsedData = JSON.parse(response.text);
            setUserInfo({
              email: parsedData.email || '',
              firstName: parsedData.firstName || '',
              lastName: parsedData.lastName || '',
              phoneNumber: parsedData.phoneNumber || '',
            });
          } catch (e) {
            console.error('Error parsing user info response:', e);
            setError('Invalid response format.');
          }
          setLoadingUser(false);
        }
      }
    );
  };

  // Fetch profile picture
  const fetchProfilePicture = () => {
    setLoadingPicture(true);
    setError(null);
    apiClient.callApi(
      '/users/profile-picture',
      'GET',
      {},
      {},
      {},
      {},
      null,
      [],
      [], // No expected content types specified
      [],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error fetching profile picture:', error);
          setProfilePicture(null); // Optionally, set to null or a default image
          setLoadingPicture(false);
        } else {
          try {
            // Assume response.text is the raw base64 string
            const base64String = response.text.trim();
            setProfilePicture(base64String);
          } catch (e) {
            console.error('Error handling profile picture response:', e);
            setError('Invalid profile picture response format.');
            setProfilePicture(null);
          }
          setLoadingPicture(false);
        }
      }
    );
  };

  // Handle input changes for user info
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for password
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle profile picture upload using fetch
  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoadingPicture(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const uploadResponse = await fetch('process.env.REACT_APP_BACKEND_URL/users/profile-picture', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies if your API requires authentication via cookies
        // Note: Do NOT set the 'Content-Type' header manually!
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(errorText || 'Failed to upload profile picture.');
      }

      console.log('Profile picture uploaded successfully');

      // Fetch the updated profile picture
      const updatedResponse = await fetch('process.env.REACT_APP_BACKEND_URL/users/profile-picture', {
        method: 'GET',
        credentials: 'include',
      });

      if (!updatedResponse.ok) {
        const errorText = await updatedResponse.text();
        throw new Error(errorText || 'Failed to fetch updated profile picture.');
      }

      const updatedBase64 = await updatedResponse.text();
      setProfilePicture(updatedBase64); // Update AuthContext with new profile picture

      setSuccessMessage('Profile picture updated successfully.');
      setLoadingPicture(false);
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError(err.message || 'Failed to upload profile picture.');
      setLoadingPicture(false);
    }
  };

  // Handle editing user information
  const handleEditUserInfo = (e) => {
    e.preventDefault();
    setEditLoading(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phoneNumber: userInfo.phoneNumber,
    };

    apiClient.callApi(
      'users/update',
      'PUT',
      {},
      {},
      { 'Content-Type': 'application/json' },
      {},
        JSON.stringify(payload),
      [],
      ['application/json'],
      ['application/json'],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error updating user info:', error);
          setError('Failed to update user information.');
        } else {
          console.log('User information updated successfully');
          setSuccessMessage('User information updated successfully.');
          fetchUserInfo(); // Refresh user info
        }
        setEditLoading(false);
      }
    );
  };

  // Handle changing password (dummy implementation)
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    // Validate passwords
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('New passwords do not match.');
      setPasswordLoading(false);
      return;
    }

    const payload = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    };
    
    apiClient.callApi(
      'users/update/password',
      'PUT',
      {},
      {},
      { 'Content-Type': 'application/json' },
      {},
      JSON.stringify(payload),
      [],
      ['application/json'],
      ['application/json'],
      null,
      null,
      (error, data, response) => {
        if (error) {
          console.error('Error changing password:', error);
          setError('Failed to change password.');
        } else {
          console.log('Password changed successfully');
          setSuccessMessage('Password changed successfully.');
          setPasswords({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        }
        setPasswordLoading(false);
      }
    );
  };

  return (
    <Container className="mt-5">
      <h2>Profile Management</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      {/* User Information Section */}
      <Row className="mt-4">
        <Col md={6}>
          <h4>Edit Personal Information</h4>
          {loadingUser ? (
            <Spinner animation="border" />
          ) : (
            <Form onSubmit={handleEditUserInfo}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={userInfo.email} 
                  onChange={handleUserInfoChange} 
                  disabled // Assuming email is not editable
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="firstName" 
                  value={userInfo.firstName} 
                  onChange={handleUserInfoChange} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="lastName" 
                  value={userInfo.lastName} 
                  onChange={handleUserInfoChange} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="phoneNumber" 
                  value={userInfo.phoneNumber} 
                  onChange={handleUserInfoChange} 
                  required 
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={editLoading}>
                {editLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save Changes'}
              </Button>
            </Form>
          )}
        </Col>

        {/* Profile Picture Section */}
        <Col md={6} className="text-center">
          <h4>Profile Picture</h4>
          {loadingPicture ? (
            <Spinner animation="border" />
          ) : (
            <>
              {profilePicture ? (
                <Image 
                  src={`data:image/jpeg;base64,${profilePicture}`} // Adjust MIME type if necessary
                  roundedCircle 
                  width={150} 
                  height={150} 
                  alt="Profile" 
                />
              ) : (
                <Image 
                  src="https://via.placeholder.com/150" 
                  roundedCircle 
                  width={150} 
                  height={150} 
                  alt="Profile Placeholder" 
                />
              )}
              <Form.Group controlId="formProfilePicture" className="mt-3">
                <Form.Label>Upload New Profile Picture</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePictureUpload} 
                />
              </Form.Group>
            </>
          )}
        </Col>
      </Row>

      {/* Change Password Section */}
      <Row className="mt-5">
        <Col md={6}>
          <h4>Change Password</h4>
          <Form onSubmit={handleChangePassword}>
            <Form.Group className="mb-3" controlId="formOldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control 
                type="password" 
                name="oldPassword" 
                value={passwords.oldPassword} 
                onChange={handlePasswordChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control 
                type="password" 
                name="newPassword" 
                value={passwords.newPassword} 
                onChange={handlePasswordChange} 
                required 
                minLength={8}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control 
                type="password" 
                name="confirmNewPassword" 
                value={passwords.confirmNewPassword} 
                onChange={handlePasswordChange} 
                required 
                minLength={8}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={passwordLoading}>
              {passwordLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Change Password'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileManagement;
