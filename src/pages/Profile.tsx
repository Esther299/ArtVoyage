import React, { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import { Modal, Button, Form, Alert } from "react-bootstrap"; // Import Bootstrap components

interface ProfileProps {
  user: { uid: string } | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const userId = user?.uid;
  const {
    userData,
    fetchUserData,
    editUserData,
    deleteUserData,
    loading,
    error,
  } = useUserData(userId || null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  const handleEdit = async () => {
    try {
      await editUserData(editFormData);
      console.log("User updated successfully!");
      setShowEditModal(false);
      setSuccessMessage("Your profile was updated successfully!"); // Set success message
      setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 5 seconds
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserData();
      console.log("User deleted successfully!");
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const openEditModal = () => {
    if (userData) {
      setEditFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      setShowEditModal(true);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Profile</h1>
      {userData ? (
        <div
          className="card mx-auto"
          style={{ maxWidth: "600px" }}
          aria-labelledby="userProfileCard"
        >
          <div
            className="card-header text-white"
            style={{ background: "rgba(84, 37, 122, 0.84)" }}
          >
            <h2 className="card-title" id="userProfileCard">
              Profile Information
            </h2>
          </div>
          <div className="card-body">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>First Name:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lastName}
            </p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-warning"
                onClick={openEditModal}
                aria-label="Edit User Information"
              >
                Edit User
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowDeleteModal(true)}
                aria-label="Delete User Account"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">No user data available.</p>
      )}

      {/* Success Message */}
      {successMessage && (
        <Alert variant="success" className="mt-4 text-center">
          {successMessage}
        </Alert>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.firstName}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    firstName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={editFormData.lastName}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, lastName: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
