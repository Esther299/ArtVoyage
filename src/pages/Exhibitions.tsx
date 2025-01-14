// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

// export const Exhibitions: React.FC = () => {
//   const { id } = useParams();
//   const [exhibition, setExhibition] = useState<any>(null);

//   useEffect(() => {
//     const fetchExhibition = async () => {
//       const docRef = doc(db, "exhibitions", id!);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setExhibition(docSnap.data());
//       }
//     };

//     fetchExhibition();
//   }, [id]);

//   return (
//     <div>
//       {exhibition ? (
//         <>
//           <h2>{exhibition.title}</h2>
//           <p>{exhibition.description}</p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

