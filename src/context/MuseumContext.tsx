import React, { createContext, useContext, useState, ReactNode } from "react";

interface MuseumContextType {
  selectedMuseum: string;
  setSelectedMuseum: React.Dispatch<React.SetStateAction<string>>;
}

const MuseumContext = createContext<MuseumContextType | undefined>(undefined);

export const MuseumProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedMuseum, setSelectedMuseum] = useState<string>("met");

  return (
    <MuseumContext.Provider value={{ selectedMuseum, setSelectedMuseum }}>
      {children}
    </MuseumContext.Provider>
  );
};

export const useMuseum = (): MuseumContextType => {
  const context = useContext(MuseumContext);
  if (!context) {
    throw new Error("useMuseum must be used within a MuseumProvider");
  }
  return context;
};
