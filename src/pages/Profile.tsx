import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Modal,
  Form,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import ErrorMessage from "../components/ErrorMessage";
import DeleteModal from "../components/DeleteModal";
import SuccessMessage from "../components/SuccessMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import useUserData from "../hooks/useUserData";

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
    profilePicture: "",
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
        profilePicture: userData.profilePicture,
      });
      setShowEditModal(true);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {userData ? (
            <Card
              className="shadow-lg rounded w-75"
              aria-labelledby="userProfileCard"
            >
              <Card.Header
                className="text-center text-white"
                style={{
                  background: "rgba(84, 37, 122, 0.9)",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}
              >
                Profile Information
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Row className="align-items-center mb-2">
                  <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
                    <Image
                      src={
                        userData.profilePicture ||
                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                      }
                      roundedCircle
                      alt="User Avatar"
                      style={{
                        width: "130px",
                        height: "130px",
                        objectFit: "cover",
                        border: "2px solid #54257A",
                      }}
                    />
                  </Col>
                  <Col xs={12} md={8}>
                    <p>
                      <strong>Email:</strong> {userData.email}
                    </p>
                    <p>
                      <strong>First Name:</strong> {userData.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong> {userData.lastName}
                    </p>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col xs={6}>
                    <Button
                      variant="warning"
                      onClick={openEditModal}
                      aria-label="Edit User Information"
                      className="w-100"
                    >
                      <i className="fas fa-edit me-2"></i>Edit User
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button
                      variant="danger"
                      onClick={() => setShowDeleteModal(true)}
                      aria-label="Delete User Account"
                      className="w-100"
                    >
                      <i className="fas fa-trash me-2"></i>Delete User
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <p className="text-center text-muted">No user data available.</p>
          )}
          {successMessage && <SuccessMessage message={successMessage} />}
          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
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
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editFormData.lastName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group controlId="formProfilePicture" className="mt-3">
                  <Form.Label>Profile Picture URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={editFormData.profilePicture}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        profilePicture: e.target.value,
                      })
                    }
                    placeholder="Enter new profile picture URL"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
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
          />{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
