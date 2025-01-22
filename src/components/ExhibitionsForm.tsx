import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  error: string | null;
  pageError: string | null;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
  error,
  pageError,
  setIsFormVisible,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <h4>Select or Create Exhibition</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {pageError && (
        <div className="alert alert-danger" role="alert">
          {pageError}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="existingExhibition" className="form-label">
          Existing Exhibition:
        </label>
        <select
          id="existingExhibition"
          className="form-select"
          onChange={(e) => setSelectedExhibitionId(e.target.value)}
          value={selectedExhibitionId || ""}
          aria-label="Select an existing exhibition"
        >
          <option value="">Select an exhibition</option>
          {exhibitions.map((exhibition) => (
            <option key={exhibition.id} value={exhibition.id}>
              {exhibition.name} (
              {new Date(exhibition.startDate).toLocaleDateString()} -{" "}
              {new Date(exhibition.endDate).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="newExhibitionName" className="form-label">
          Exhibition Name:
        </label>
        <input
          type="text"
          id="newExhibitionName"
          className="form-control"
          value={newExhibitionName}
          onChange={(e) => setNewExhibitionName(e.target.value)}
          required
          aria-required="true"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="newExhibitionDates" className="form-label">
          Exhibition Dates:
        </label>
        <br />
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
        />
      </div>

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
