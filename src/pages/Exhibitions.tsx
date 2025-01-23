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
  const { exhibitions, loading } = useExhibitions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center fs-1 mb-4">Exhibitions</h1>

      {exhibitions.length > 0 ? (
        <div className="row g-4">
          {exhibitions.map((exhibition) => (
            <div key={exhibition.id} className="col-md-6 col-lg-4">
              <Link
                to={`/exhibition/${exhibition.id}`}
                className="btn btn-outline-secondary mt-3"
                aria-label={`Manage exhibition ${exhibition.name}`}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h2 className="card-title text-decoration-underline text-center py-3 fs-2">
                      {exhibition.name}
                    </h2>
                    <p className="card-text text-center text-muted">
                      {formatExhibitionDateRange(
                        exhibition.startDate,
                        exhibition.endDate
                      )}
                    </p>
                    <img
                      src={exhibition.image}
                      alt={`Exhibition titled "${exhibition.name}"`}
                      width="400"
                      height="300"
                      className="img-fluid my-3"
                      style={{
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <ul className="list-group list-group-flush">
                      <h5 className="text-decoration-underline">
                        What you will be seeing:
                      </h5>
                      {exhibition.artworks.map((artwork) => (
                        <li
                          key={artwork.id}
                          className="list-group-item justify-content-between mb-3"
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
