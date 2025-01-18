import React from "react";
import { Link } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext"
import { useQuery } from "../context/QueryContext";

const Home: React.FC = () => {
  const { selectedMuseum, setSelectedMuseum } = useMuseum();
  const {setQuery} = useQuery();

  const handleSetSelectedMuseum = (museum: string) => {
    setQuery("")
    setSelectedMuseum(museum);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Artworks Search</h1>
      <div className="d-flex justify-content-center">
        <Link
          to="/met"
          onClick={() => handleSetSelectedMuseum("met")}
          className={`btn btn-link ${
            selectedMuseum === "met" ? "text-primary" : "text-dark"
          }`}
          style={{ marginRight: "20px" }}
        >
          Metropolitan Museum of Art
        </Link>
        <Link
          to="/chicago"
          onClick={() => handleSetSelectedMuseum("chicago")}
          className={`btn btn-link ${
            selectedMuseum === "chicago" ? "text-primary" : "text-dark"
          }`}
        >
          Art Institute of Chicago
        </Link>
      </div>
    </div>
  );
};

export default Home;
