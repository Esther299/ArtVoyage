import { createContext, useContext, useState, ReactNode } from "react";

const TypeContext = createContext<any>(undefined);

export const useType = () => useContext(TypeContext);

export const TypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string>("artist_title");

  return (
    <TypeContext.Provider value={{ type, setType }}>
      {children}
    </TypeContext.Provider>
  );
};
