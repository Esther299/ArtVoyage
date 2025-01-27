import React from "react";
import { MuseumProvider } from "./MuseumContext";
import { QueryProvider } from "./QueryContext";
import { TypeProvider } from "./TypeContext";
import { ExhibitionProvider } from "./ExhibitionContext";
import { AuthProvider } from "./AuthContext";
import { ArtworksProvider } from "./ArtworksContext";
import { CollectionProvider } from "./CollectionContext";
import { DeleteModalProvider } from "./DeleteContext";

const AllProviders: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AuthProvider>
      <MuseumProvider>
        <ArtworksProvider>
          <QueryProvider>
            <TypeProvider>
              <DeleteModalProvider>
                <CollectionProvider>
                  <ExhibitionProvider>{children}</ExhibitionProvider>
                </CollectionProvider>
              </DeleteModalProvider>
            </TypeProvider>
          </QueryProvider>
        </ArtworksProvider>
      </MuseumProvider>
    </AuthProvider>
  );
};

export default AllProviders;
