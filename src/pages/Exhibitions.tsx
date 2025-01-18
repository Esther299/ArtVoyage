import React, { useEffect } from "react";
import { useExhibitions } from "../context/ExhibitionContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

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
      <div className="alert alert-danger my-5 text-center">Error: {error}</div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Exhibitions</h1>
      {exhibitions.length > 0 ? (
        <div className="row">
          {exhibitions.map((exhibition) => (
            <div className="col-md-6 col-lg-4 mb-4" key={exhibition.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">{exhibition.name}</h3>
                  <p className="card-text">
                    <strong>Date:</strong> {exhibition.date}
                  </p>
                  <h4>Artworks:</h4>
                  <ul className="list-unstyled">
                    {exhibition.artworks.map((artwork) => (
                      <li key={artwork.id} className="mb-2">
                        <h5>{artwork.title}</h5>
                        <p>
                          <strong>Artist:</strong> {artwork.artist_display}
                        </p>
                        <p>
                          <strong>Medium:</strong> {artwork.medium_display}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
