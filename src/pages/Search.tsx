import React from "react";
import { Link } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";

const Search: React.FC = () => {
  const { setSelectedMuseum } = useMuseum();
  const { setQuery } = useQuery();

  const handleSetSelectedMuseum = (museum: string) => {
    setQuery("");
    setSelectedMuseum(museum);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Choose a museum to start searching:</h1>
      <div className="d-flex justify-content-center">
        <div
          className="card homecard mx-3 bg-light shadow-sm hover:bg-dark"
          style={{
            width: "22rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            to="/search/museum/cleveland"
            onClick={() => handleSetSelectedMuseum("cleveland")}
            className="text-decoration-none"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/74/Logo_Cleveland_Museum_of_Art.svg"
              className="card-img-top"
              alt="Cleveland Museum of Art "
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
          className="homecard mx-3 bg-light shadow-sm hover:bg-dark"
          style={{
            width: "22rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            to="/search/museum/chicago"
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

        <Link
          to="/search/collection"
          onClick={() => handleSetSelectedMuseum("")}
          className="text-decoration-none"
        >
          <div
            className="homecard mx-3 bg-light shadow-sm hover:bg-dark"
            style={{
              width: "22rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            <p>Collection</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
