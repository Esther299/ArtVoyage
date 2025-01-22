import React from "react";
import { Link } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";


const Home: React.FC = () => {
  const { setSelectedMuseum } = useMuseum();
  const { setQuery } = useQuery();

  const handleSetSelectedMuseum = (museum: string) => {
    setQuery("");
    setSelectedMuseum(museum);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Artworks Search</h1>
      <div className="d-flex justify-content-center">
        <div
          className="card mx-3 bg-light shadow-sm hover:bg-dark"
          style={{
            width: "22rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            to="/museum/met"
            onClick={() => handleSetSelectedMuseum("met")}
            className="text-decoration-none"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/73/The_Metropolitan_Museum_of_Art_Logo.svg"
              className="card-img-top"
              alt="Metropolitan Museum of Art"
              style={{
                height: "200px",
                width: "100%",
                objectFit: "contain",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
          </Link>
        </div>

        <div
          className="card mx-3 bg-light shadow-sm hover:bg-dark"
          style={{
            width: "22rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            to="/museum/chicago"
            onClick={() => handleSetSelectedMuseum("chicago")}
            className="text-decoration-none"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Art_Institute_of_Chicago_Logo.png"
              className="card-img-top"
              alt="Art Institute of Chicago"
              style={{
                height: "200px",
                width: "100%",
                objectFit: "contain",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );

};

export default Home;
