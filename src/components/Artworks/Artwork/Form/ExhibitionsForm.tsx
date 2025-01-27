import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../../../utils/dateFormatting";

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
    <form
      onSubmit={onSubmit}
      className="mt-4 p-4 rounded shadow-sm"
      style={{ background: "rgba(204, 173, 227, 0.84)" }}
    >
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="existingExhibition" className="form-label fw-bold">
          Select one of your exhibitions:
        </label>
        <select
          id="existingExhibition"
          className="form-select"
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
        </select>
      </div>

      <fieldset disabled={isExistingExhibitionSelected}>
        <div className="mb-4">
          <label htmlFor="newExhibitionName" className="form-label fw-bold">
            Create a new exhibition:
          </label>
          <input
            type="text"
            id="newExhibitionName"
            className="form-control"
            placeholder="Exhibition name"
            value={newExhibitionName}
            onChange={(e) => setNewExhibitionName(e.target.value)}
            required={!isExistingExhibitionSelected}
            aria-required={!isExistingExhibitionSelected}
          />
        </div>

        <div className="mb-4">
          <ReactDatePicker
            selected={newExhibitionStartDate}
            onChange={handleDateChange}
            startDate={newExhibitionStartDate}
            endDate={newExhibitionEndDate}
            selectsRange
            inline
            placeholderText="Select start and end dates"
            className="form-control"
            aria-label="Select exhibition start and end dates"
            required={!isExistingExhibitionSelected}
          />
        </div>
      </fieldset>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Submitting..." : "Add"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsFormVisible(false)}
          aria-label="Cancel and close form"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExhibitionForm;
