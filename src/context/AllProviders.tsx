import React from "react";
import { MuseumProvider } from "./MuseumContext";
import { QueryProvider } from "./QueryContext";
import { TypeProvider } from "./TypeContext";
import { ExhibitionProvider } from "./ExhibitionContext";

const AllProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <MuseumProvider>
      <QueryProvider>
        <TypeProvider>
          <ExhibitionProvider>{children}</ExhibitionProvider>
        </TypeProvider>
      </QueryProvider>
    </MuseumProvider>
  );
};

export default AllProviders;
