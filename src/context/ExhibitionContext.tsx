import React, { createContext, useContext, useState } from "react";
import { Artwork } from "../types/types";

interface Exhibition {
  id: string;
  name: string;
  date: string;
  artworks: Artwork[];
}

interface ExhibitionContextType {
  exhibitions: Exhibition[];
  addExhibition: (exhibition: Exhibition) => void;
  addArtworkToExhibition: (exhibitionId: string, artwork: Artwork) => void;
}

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(
  undefined
);

export const ExhibitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([
    {
      id: "1",
      name: "Impressionist Masterpieces",
      date: "2025-05-10",
      artworks: [],
    },
    { id: "2", name: "Modern Art Wonders", date: "2025-06-15", artworks: [] },
  ]);

  const addExhibition = (exhibition: Exhibition) => {
    setExhibitions([...exhibitions, exhibition]);
  };

  const addArtworkToExhibition = (exhibitionId: string, artwork: Artwork) => {
    setExhibitions(
      exhibitions.map((ex) =>
        ex.id === exhibitionId
          ? { ...ex, artworks: [...ex.artworks, artwork] }
          : ex
      )
    );
  };

  return (
    <ExhibitionContext.Provider
      value={{ exhibitions, addExhibition, addArtworkToExhibition }}
    >
      {children}
    </ExhibitionContext.Provider>
  );
};

export const useExhibitions = (): ExhibitionContextType => {
  const context = useContext(ExhibitionContext);
  if (!context) {
    throw new Error("useExhibitions must be used within an ExhibitionProvider");
  }
  return context;
};
