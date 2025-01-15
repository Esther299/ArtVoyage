import { createContext, useContext, useState, ReactNode } from "react";

const QueryContext = createContext<any>(undefined);

export const useQuery = () => useContext(QueryContext);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [metQuery, setMetQuery] = useState<string>("");
  const [chicagoQuery, setChicagoQuery] = useState<string>("");

  return (
    <QueryContext.Provider
      value={{ metQuery, setMetQuery, chicagoQuery, setChicagoQuery }}
    >
      {children}
    </QueryContext.Provider>
  );
};
