# ArtVoyage
This project was created as part of a research for Tech Returners.

- Deployed Version: [ArtVoyage](https://artvoyage2000.netlify.app/)

## Description

**ArtVoyage** is a dynamic web application that empowers art enthusiasts, researchers, and students to explore and curate virtual exhibitions. By aggregating collections from leading institutions like the Cleveland Museum of Art and the Chicago Art Institute, this platform offers a unique, interactive experience of antiquities and fine art.

## Key Features

- **Multi-Source Art Search:**  
  Seamlessly search for artworks across two museum APIs, giving you access to diverse and expansive collections.

- **Paginated Browsing:**  
  Enjoy a streamlined browsing experience with paginated navigation, ensuring that you can explore art without being overwhelmed by too many items at once.

- **Advanced Filtering and Sorting:**  
  Quickly refine your search results with robust filtering and sorting options, making it easier to find the art that speaks to you.

- **Detailed Artwork Display:**  
  View high-quality images alongside essential artwork details, providing an engaging and informative look at each piece.

- **Personal Exhibition Curation:**  
  Create and manage your own curated exhibitions. Add your favorite artworks to personal collections, and organize multiple exhibitions tailored to your tastes.

- **Firebase Integration:**  
  Benefit from secure user authentication and data management with Firebase, ensuring your curated exhibitions and personal data are safely stored in Firestore.

## Tech Stack

- **Frontend:** React and TypeScript
- **Backend:** Firebase (Firestore for data storage, Authentication for user management)
- **Build Tool:** Vite
- **Hosting:** Netlify

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have **Node.js v22.3.0** installed.
- **Firebase Account:** You need your own Firebase account with a configured Firestore database and authentication.
- **Repository:** Fork this repository and then clone it:
  ```sh
  git clone <your-repository-url>
  cd ArtVoyage
  ```

### Installation

Install dependencies using npm:

```sh
npm install
```

### Firebase Configuration with Environment Variables

A `firebase.ts` file should already be inside the `src` directory with the Firebase configuration:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

Create a `.env` file at the root of your project with the following variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```
Replace the values in your `.env` file with your actual Firebase project credentials.

### Building for Production

To create a production build, run:

```sh
npm run build
```

### Running the Project

Start the development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Deployment

You can deploy the built project using GitHub Pages, Netlify, or another hosting provider.

### Project Documentation

-**Deployed App**: Click [here](https://artvoyage2000.netlify.app/) to view the deployed app.

- **Video Walkthrough**: Click here to view a video walkthrough of the platform.
- **API Integration**:
  1. [Cleveland Museum of Art](https://openaccess-api.clevelandart.org/)
  2. [Chicago Art Institute](https://api.artic.edu/docs/)


For any questions or issues, please contact the project maintainers.
