import React, { useState, useEffect } from "react";
import { Exhibition } from "../../types/types";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EditExhibitionModalProps {
  show: boolean;
  handleClose: () => void;
  handleEditExhibition: (
    exhibitionId: string,
    updatedFields: { name: string; startDate: string; endDate: string }
  ) => void;
  exhibition: Exhibition | null;
}

const EditExhibitionModal: React.FC<EditExhibitionModalProps> = ({
  show,
  handleClose,
  handleEditExhibition,
  exhibition,
}) => {
  const [name, setName] = useState("");
  const [newStartDate, setNewStartDate] = useState<Date | null>(null);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setNewStartDate(start);
    setNewEndDate(end);
  };

  useEffect(() => {
    if (exhibition) {
      setName(exhibition.name);

      const startDate = exhibition.startDate
        ? new Date(exhibition.startDate)
        : null;
      const endDate = exhibition.endDate ? new Date(exhibition.endDate) : null;

      setNewStartDate(startDate);
      setNewEndDate(endDate);
    }
  }, [exhibition]);

  const handleSubmit = () => {
    if (!name) {
      alert("Exhibition name is required.");
      return;
    }

    if (!newStartDate || !newEndDate) {
      alert("Both start and end dates are required.");
      return;
    }

    if (newStartDate && newEndDate && newStartDate > newEndDate) {
      alert("Start date must be before the end date.");
      return;
    }

    const startDateString = new Date(newStartDate).toISOString();
    const endDateString = new Date(newEndDate).toISOString();

    if (exhibition) {
      handleEditExhibition(exhibition.id, {
        name,
        startDate: startDateString,
        endDate: endDateString,
      });
      handleClose();
    }
  };

  if (!show || !exhibition) return null;

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Exhibition</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exhibition-name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="exhibition-name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newExhibitionDates" className="form-label">
                Exhibition Dates:
              </label>
              <br />
              <ReactDatePicker
                selected={newStartDate}
                onChange={handleDateChange}
                startDate={newStartDate}
                endDate={newEndDate}
                selectsRange
                inline
                placeholderText="Select start and end dates"
                className="form-control"
                aria-label="Select exhibition start and end dates"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExhibitionModal;
