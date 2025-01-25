import React, { createContext, useContext } from "react";
import { useCollectionData } from "../hooks/useCollectionData";
import { Artwork } from "../types/types";
import { useQuery } from "./QueryContext";
import { useType } from "./TypeContext";

interface CollectionContextType {
  collection: Artwork[];
  addToCollection: (artwork: Artwork) => Promise<void>;
  removeFromCollection: (id: number) => Promise<void>;
  searchCollection: () => Promise<void>;
  loadingCollection: boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
const { query } = useQuery();
const { type } = useType();

  const {
    collectionState,
    addToCollection,
    removeFromCollection,
    searchCollection,
    loadingCollection,
  } = useCollectionData(query, type);

  return (
    <CollectionContext.Provider
      value={{
        collection: collectionState,
        addToCollection,
        removeFromCollection,
        searchCollection,
        loadingCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = (): CollectionContextType => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
};
