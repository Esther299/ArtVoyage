import React, { createContext, useContext, useState, ReactNode } from "react";

type EntityType = "artwork" | "exhibition";

interface DeleteModalContextType {
  showDeleteModal: boolean;
  entityType: EntityType | null;
  entityId: string | number | null;
  setEntityToDelete: (
    entityType: EntityType,
    entityId: string | number
  ) => void;
  closeDeleteModal: () => void;
}

const DeleteModalContext = createContext<DeleteModalContextType | undefined>(
  undefined
);

export const useDeleteModal = (): DeleteModalContextType => {
  const context = useContext(DeleteModalContext);
  if (!context) {
    throw new Error("useDeleteModal must be used within a DeleteModalProvider");
  }
  return context;
};


export const DeleteModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entityType, setEntityType] = useState<EntityType | null>(null);
  const [entityId, setEntityId] = useState<string | number | null>(null);

  const setEntityToDelete = (type: EntityType, id: string | number) => {
    setEntityType(type);
    setEntityId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setEntityType(null);
    setEntityId(null);
  };

  return (
    <DeleteModalContext.Provider
      value={{
        showDeleteModal,
        entityType,
        entityId,
        setEntityToDelete,
        closeDeleteModal,
      }}
    >
      {children}
    </DeleteModalContext.Provider>
  );
};
