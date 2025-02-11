import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllProviders from "./context/AllProviders";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import SearchPage from "./pages/ArtworkSearch";
import Exhibitions from "./pages/Exhibitions";
import ArtworkDetail from "./pages/ArtworkDetail";
import ExhibitionDetail from "./pages/ExhibitionDetail";
import Collection from "./pages/Collection";
import { useAuth } from "./context/AuthContext";

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <div className="app-background vh-100 position-fixed top-0 left-0 w-100" />
      <div className="container-fluid d-flex flex-column min-vh-100">
        {user && <NavBar />}
        <div className="flex-grow-1">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Routes>
              {user ? (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/profile" element={<Profile user={user} />} />
                  <Route path="/artwork/:id" element={<ArtworkDetail />} />
                  <Route
                    path="/search/museum/:museumName"
                    element={<SearchPage />}
                  />
                  <Route path="/exhibitions" element={<Exhibitions />} />
                  <Route path="/collection" element={<Collection />} />
                  <Route
                    path="/exhibition/:exhibitionId"
                    element={<ExhibitionDetail />}
                  />
                  <Route path="*" element={<Navigate to="/home" />} />
                </>
              ) : (
                <>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={<Navigate to="/auth" />} />
                </>
              )}
            </Routes>
          )}
        </div>
        {user && <Footer />}
      </div>
    </>
  );
};

const App: React.FC = () => (
  <AllProviders>
    <Router>
      <AppContent />
    </Router>
  </AllProviders>
);

export default App;
