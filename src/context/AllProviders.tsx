import React from "react";
import { MuseumProvider } from "./MuseumContext";
import { QueryProvider } from "./QueryContext";
import { TypeProvider } from "./TypeContext";

const AllProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <MuseumProvider>
      <QueryProvider>
        <TypeProvider>{children}</TypeProvider>
      </QueryProvider>
    </MuseumProvider>
  );
};

export default AllProviders;
