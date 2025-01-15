import { createContext, useContext, useState, ReactNode } from "react";

const QueryContext = createContext<any>(undefined);

export const useQuery = () => useContext(QueryContext);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};
