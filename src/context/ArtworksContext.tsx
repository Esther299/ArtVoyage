import React, { createContext, useState, useContext, ReactNode } from "react";
import { Artwork } from "../types/types";

interface ArtworksContextType {
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
}

const ArtworksContext = createContext<ArtworksContextType | undefined>(
  undefined
);

interface ArtworksProviderProps {
  children: ReactNode;
}

export const ArtworksProvider: React.FC<ArtworksProviderProps> = ({
  children,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  return (
    <ArtworksContext.Provider value={{ artworks, setArtworks}}>
      {children}
    </ArtworksContext.Provider>
  );
};

export const useArtworksData = (): ArtworksContextType => {
  const context = useContext(ArtworksContext);
  if (!context) {
    throw new Error(
      "useArtworksContext must be used within an ArtworksProvider"
    );
  }
  return context;
};