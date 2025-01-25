import React, { createContext, useContext } from "react";
import { useCollectionData } from "../hooks/useCollectionData";
import { Artwork } from "../types/types";

interface CollectionContextType {
  collection: Artwork[];
  addToCollection: (artwork: Artwork) => Promise<void>;
  removeFromCollection: (id: number) => Promise<void>;
  loadingCollection: boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined
);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const {
    collectionState,
    addToCollection,
    removeFromCollection,
    loadingCollection,
  } = useCollectionData();

  return (
    <CollectionContext.Provider
      value={{
        collection: collectionState,
        addToCollection,
        removeFromCollection,
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
