import React, { createContext, useContext } from "react";
import useExhibition from "../hooks/useExhibition";
import { Artwork, Exhibition } from "../types/types";

interface ExhibitionContextType {
  exhibitions: Exhibition[];
  addExhibition: (exhibition: Omit<Exhibition, "id">) => Promise<void>;
  addArtworkToExhibition: (
    exhibitionId: string,
    artwork: Artwork
  ) => Promise<void>;
}

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(
  undefined
);

export const ExhibitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { exhibitions, addExhibition, addArtworkToExhibition } =
    useExhibition();

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
