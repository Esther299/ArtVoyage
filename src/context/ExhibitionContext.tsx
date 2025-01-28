import React, { createContext, useContext } from "react";
import useExhibitionData from "../hooks/useExhibitionData";
import { Artwork, Exhibition } from "../types/types";

interface ExhibitionContextType {
  exhibitions: Exhibition[];
  addExhibition: (
    exhibition: Omit<Exhibition, "id" | "image">
  ) => Promise<void>;
  addArtworkToExhibition: (
    exhibitionId: string,
    artwork: Artwork
  ) => Promise<void>;
  editExhibition: (
    exhibitionId: string,
    updatedFields: Partial<Omit<Exhibition, "id">>
  ) => Promise<void>;
  deleteArtworkFromExhibition: (
    exhibitionId: string,
    artworkId: number
  ) => Promise<void>;
  deleteExhibition: (exhibitionId: string) => Promise<void>;
  loading: boolean;
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
    editExhibition,
    deleteArtworkFromExhibition,
    deleteExhibition,
    loading,
  } = useExhibitionData();

  return (
    <ExhibitionContext.Provider
      value={{
        exhibitions,
        addExhibition,
        addArtworkToExhibition,
        editExhibition,
        deleteArtworkFromExhibition,
        deleteExhibition,
        loading,
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
