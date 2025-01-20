import React, { createContext, useContext } from "react";
import useExhibitionData from "../hooks/useExhibitionData";
import { Artwork, Exhibition } from "../types/types";

interface ExhibitionContextType {
  exhibitions: Exhibition[];
  addExhibition: (exhibition: Omit<Exhibition, "id">) => Promise<void>;
  addArtworkToExhibition: (
    exhibitionId: string,
    artwork: Artwork
  ) => Promise<void>;
  deleteArtworkFromExhibition: (
    exhibitionId: string,
    artworkId: number
  ) => Promise<void>;
  deleteExhibition: (exhibitionId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(
  undefined
);

export const ExhibitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    exhibitions,
    addExhibition,
    addArtworkToExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
    loading,
    error,
  } = useExhibitionData();

  return (
    <ExhibitionContext.Provider
      value={{
        exhibitions,
        addExhibition,
        addArtworkToExhibition,
        deleteArtworkFromExhibition,
        deleteExhibition,
        loading,
        error,
      }}
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
