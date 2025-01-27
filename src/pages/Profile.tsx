import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";
import { Modal, Button, Form } from "react-bootstrap";
import { ErrorMessage } from "../components/ErrorMessage";
import DeleteModal from "../components/DeleteModal";
import { SuccessMessage } from "../components/SuccessMessage";

interface ProfileProps {
  user: { uid: string } | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const userId = user?.uid || null;
  const {
    userData,
    fetchUserData,
    editUserData,
    deleteUserData,
    loading,
    error,
  } = useUserData(userId);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);
    

  const handleEdit = async () => {
    try {
      await editUserData(editFormData);
      setShowEditModal(false);
      setSuccessMessage("Your profile was updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserData();
      setSuccessMessage("Your profile was deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mt-5">
      {userData ? (
        <div
          className="card mx-auto"
          style={{ background: "rgba(200, 136, 206, 0.84)", maxWidth: "30%" }}
          aria-labelledby="userProfileCard"
        >
          <div
            className="card-header text-white text-center"
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
                className="btn btn-outline-warning"
                onClick={openEditModal}
                aria-label="Edit User Information"
              >
                Edit User
              </button>
              <button
                className="btn btn-outline-danger"
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

      {successMessage && <SuccessMessage message={successMessage} />}

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

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
        entityType={null}
        entityId={userId}
      />
    </div>
  );
};

export default Profile;
