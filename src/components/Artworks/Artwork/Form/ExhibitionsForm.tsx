import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { formatDate } from "../../../../utils/dateFormatting";
import SuccessMessage from "../../../SuccessMessage";

interface ExhibitionFormProps {
  exhibitions: any[];
  selectedExhibitionId: string | null;
  setSelectedExhibitionId: React.Dispatch<React.SetStateAction<string | null>>;
  newExhibitionName: string;
  setNewExhibitionName: React.Dispatch<React.SetStateAction<string>>;
  newExhibitionStartDate: Date | null;
  newExhibitionEndDate: Date | null;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage: string | null;
}

const ExhibitionForm: React.FC<ExhibitionFormProps> = ({
  exhibitions,
  selectedExhibitionId,
  setSelectedExhibitionId,
  newExhibitionName,
  setNewExhibitionName,
  newExhibitionStartDate,
  newExhibitionEndDate,
  handleDateChange,
  handleSubmit,
  loading,
  setIsFormVisible,
  successMessage,
}) => {
  const isExistingExhibitionSelected = Boolean(selectedExhibitionId);
  const validateForm = () => {
    if (!isExistingExhibitionSelected) {
      if (!newExhibitionName.trim()) {
        alert("Exhibition name is required.");
        return false;
      }

      if (!newExhibitionStartDate || !newExhibitionEndDate) {
        alert("Both start and end dates are required.");
        return false;
      }

      if (newExhibitionStartDate > newExhibitionEndDate) {
        alert("Start date must be before the end date.");
        return false;
      }
    }

    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      handleSubmit(e);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="mt-4 p-3 rounded shadow-sm"
      style={{ background: "rgba(204, 173, 227, 0.84)" }}
    >
      {successMessage && <SuccessMessage message={successMessage} />}

      <Form.Group as={Row} controlId="existingExhibition" className="mb-4">
        <Form.Label column sm={4} className="fw-bold">
          Select one of your exhibitions:
        </Form.Label>
        <Col sm={8}>
          <Form.Select
            onChange={(e) => setSelectedExhibitionId(e.target.value)}
            value={selectedExhibitionId || ""}
            aria-label="Select one of your exhibitions"
          >
            <option value="">Select an exhibition</option>
            {exhibitions.map((exhibition) => (
              <option key={exhibition.id} value={exhibition.id}>
                {exhibition.name}{" "}
                {formatDate(exhibition.startDate, exhibition.endDate)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      <fieldset disabled={isExistingExhibitionSelected}>
        <Form.Group as={Row} controlId="newExhibitionName" className="mb-4">
          <Form.Label column sm={4} className="fw-bold">
            Create a new exhibition:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Exhibition name"
              value={newExhibitionName}
              onChange={(e) => setNewExhibitionName(e.target.value)}
              required={!isExistingExhibitionSelected}
              aria-required={!isExistingExhibitionSelected}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4">
          <Form.Label column sm={4} className="fw-bold">
            Select Dates:
          </Form.Label>
          <Col sm={8}>
            <ReactDatePicker
              selected={newExhibitionStartDate}
              onChange={handleDateChange}
              startDate={newExhibitionStartDate}
              endDate={newExhibitionEndDate}
              selectsRange
              inline={false}
              placeholderText="Select start and end dates"
              className="form-control"
              aria-label="Select exhibition start and end dates"
              required={!isExistingExhibitionSelected}
            />
          </Col>
        </Form.Group>
      </fieldset>

      <Row className="mt-3">
        <Col xs={12} md="auto" className="mb-2 mb-md-0">
          <Button
            type="submit"
            variant="success"
            disabled={loading}
            className="w-100"
          >
            {loading ? "Submitting..." : "Add"}
          </Button>
        </Col>
        <Col xs={12} md="auto">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsFormVisible(false)}
            aria-label="Cancel and close form"
            className="w-100"
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ExhibitionForm;
