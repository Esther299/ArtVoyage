import React, {useEffect} from "react";
import { useMuseum } from "../context/MuseumContext";
import { useQuery } from "../context/QueryContext";
import { useType } from "../context/TypeContext";
import { useArtworks } from "../hooks/useArtworks";
import SearchBar from "../components/SearchBar";
import ArtworkList from "../components/ArtworkList";

const ChicagoMuseumPage: React.FC = () => {
  const { query, setQuery } = useQuery();
  const { type, setType } = useType();
  const { selectedMuseum } = useMuseum();

  const { artworks, loading, error, setArtworks } = useArtworks(
    selectedMuseum,
    query,
    type
  );

  useEffect(() => {
    setQuery("");
    setType("artist");
    setArtworks([]);
  }, [selectedMuseum, setQuery, setType, setArtworks]);

  const handleSearch = (type: string, query: string) => {
    setQuery(query);
    setType(type);
  };
  return (
    <div>
      <h1>Art Institute of Chicago</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ArtworkList artworks={artworks} />
    </div>
  );
};

export default ChicagoMuseumPage;
