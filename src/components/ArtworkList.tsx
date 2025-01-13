import React, { useEffect, useState } from "react";
import { fetchFromChicagoArtInstitute } from "../api/chicagoApi";
import { fetchFromMetMuseum } from "../api/metApi";
import { Artwork } from "../types/types";
import ArtworkCard from "./ArtworkCard";
import Pagination from "./Pagination";

interface ArtworkListProps {
  searchQuery: string;
}

const ArtworkList: React.FC<ArtworkListProps> = ({ searchQuery }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const metArtworks = await fetchFromMetMuseum(searchQuery);
        const chicagoArtworks = await fetchFromChicagoArtInstitute(searchQuery, page);
        setArtworks([...metArtworks, ...chicagoArtworks]);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchArtworks();
    }
  }, [searchQuery, page]);

  return (
    <div>
      {loading ? (
        <p>Loading artworks...</p>
      ) : (
        <div>
          {artworks.slice((page - 1) * 5, page * 5).map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
          <Pagination currentPage={page} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default ArtworkList;
