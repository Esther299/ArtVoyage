import React, { createContext, useContext, useState, ReactNode } from "react";

interface TypeContextType {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

const TypeContext = createContext<TypeContextType | undefined>(undefined);

export const TypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [type, setType] = useState<string>("all");

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};

export const useType = (): TypeContextType => {
  const context = useContext(TypeContext);
  if (!context) {
    throw new Error("useType must be used within a TypeProvider");
  }
  return context;
};
