import React from "react";
import { MuseumProvider } from "./MuseumContext";
import { QueryProvider } from "./QueryContext";
import { TypeProvider } from "./TypeContext";
import { ExhibitionProvider } from "./ExhibitionContext";
import { AuthProvider } from "./AuthContext";

const AllProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AuthProvider>
      <MuseumProvider>
        <QueryProvider>
          <TypeProvider>
            <ExhibitionProvider>{children}</ExhibitionProvider>
          </TypeProvider>
        </QueryProvider>
      </MuseumProvider>
    </AuthProvider>
  );
};

export default AllProviders;
