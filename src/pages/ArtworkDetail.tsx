import React from "react";
import { useParams } from "react-router-dom";
import { useArtworksData } from "../context/ArtworksContext";

const ArtworkDetail: React.FC = () => {
  const { artworks } = useArtworksData();
  const { id } = useParams<{ id: string }>();
  const artwork = artworks.find((art) => art.id === Number(id));

  if (!artwork) {
    return (
      <div className="alert alert-warning text-center mt-5" role="alert">
        Artwork not found. Please check the ID or return to the home page.
      </div>
    );
  }

  console.log(artwork)


 return (
   <div className="container my-5">
     <div className="row justify-content-center">
       <div className="col-lg-8">
         <div className="card shadow-lg rounded-3">
           <div className="card-body">
             <div className="artwork-image-container mb-4">
               <img
                 src={artwork.imageUrl}
                 alt={artwork.title}
                 className="img-fluid rounded-3 shadow-lg"
               />
             </div>

             <div className="artwork-info">
               <h2 className="text-center mb-3">{artwork.title}</h2>
               <div className="artwork-details text-center mt-3">
                 <p className="text-muted">
                   <strong>{artwork.artist_title}</strong>
                   <span className="mx-2">|</span>
                   <strong>{artwork.artist_bio}</strong>
                 </p>
                 <p className="text-center text-muted">
                   <span>Created in {artwork.date}</span>
                 </p>
                 <p className="font-weight-bold">{artwork.medium_display}</p>
                 <div
                   dangerouslySetInnerHTML={{
                     __html: artwork.description,
                   }}
                 />
               </div>
             </div>

             <div className="text-center mt-4">
               <a
                 href={artwork.objectUrl}
                 className="btn btn-outline-secondary btn-lg mx-2"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 View on Source
               </a>
               <button
                 className="btn btn-outline-primary btn-lg mx-2"
                 onClick={() => window.history.back()}
               >
                 Go Back
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default ArtworkDetail;
