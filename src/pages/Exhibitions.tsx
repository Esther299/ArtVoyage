import React, { useEffect } from "react";
import { useExhibitions } from "../context/ExhibitionContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import {
  formatExhibitionDateRange,
  formatTimestamp,
} from "../utils/dateFormatting";

const Exhibitions: React.FC = () => {
  const { exhibitions, loading, error } = useExhibitions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger my-5 text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Exhibitions</h1>

      {exhibitions.length > 0 ? (
        <div className="row g-4">
          {exhibitions.map((exhibition) => (
            <div key={exhibition.id} className="col-md-6 col-lg-4">
              <Link
                to={`/exhibition/${exhibition.id}`}
                className="btn btn-outline-secondary btn-sm mt-3 w-100"
                aria-label={`Manage exhibition ${exhibition.name}`}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h2 className="card-title text-center py-3">
                      {exhibition.name}
                    </h2>
                    <p className="card-text text-center text-muted">
                      {formatExhibitionDateRange(
                        exhibition.startDate,
                        exhibition.endDate
                      )}
                    </p>

                    <ul
                      className="list-unstyled flex-grow-1 overflow-auto"
                      style={{ maxHeight: "200px", padding: "10px" }}
                    >
                      {exhibition.artworks.map((artwork) => (
                        <li
                          key={artwork.id}
                          className="d-flex justify-content-between align-items-center mb-3"
                        >
                          <div>
                            <span className="ms-2 d-block">
                              "{artwork.title}" by <i>{artwork.artist_title}</i>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <p className="card-text text-center text-muted">
                      Created at {formatTimestamp(exhibition.createdAt)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No exhibitions found.</p>
      )}
    </div>
  );
};

export default Exhibitions;
