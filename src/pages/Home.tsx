import React from "react";
import { Link } from "react-router-dom";
import { useMuseum } from "../context/MuseumContext";

const Home: React.FC = () => {
  const { selectedMuseum, setSelectedMuseum } = useMuseum();

  const handleSetSelectedMuseum = (museum: string) => {
    setSelectedMuseum(museum);
  };

  return (
    <div>
      <h1>Artworks Search</h1>
      <div>
        <Link
          to="/met"
          onClick={() => handleSetSelectedMuseum("met")}
          style={{
            marginRight: "20px",
            textDecoration: "none",
            color: selectedMuseum === "met" ? "blue" : "black",
          }}
        >
          Metropolitan Museum of Art
        </Link>
        <Link
          to="/chicago"
          onClick={() => handleSetSelectedMuseum("chicago")}
          style={{
            textDecoration: "none",
            color: selectedMuseum === "chicago" ? "blue" : "black",
          }}
        >
          Art Institute of Chicago
        </Link>
      </div>
    </div>
  );
};

export default Home;
