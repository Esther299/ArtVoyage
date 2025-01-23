import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllProviders from "./context/AllProviders";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MuseumSearch from "./pages/MuseumSearch";
import Exhibitions from "./pages/Exhibitions";
import Auth from "./pages/Auth";
import { useAuth } from "./context/AuthContext";
import ArtworkDetail from "./pages/ArtworkDetail";

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="app-background vh-100 position-fixed top-0 left-0 w-100" />
      <div className="container-fluid d-flex flex-column vh-100">
        {user && <NavBar />}
        <div className="flex-grow-1">
          <Routes>
            {user ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile user = {user} />} />
                <Route path="/artwork/:id" element={<ArtworkDetail />} />
                <Route path="/museum/:museumName" element={<MuseumSearch />} />
                <Route path="/exhibitions" element={<Exhibitions />} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            ) : (
              <>
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}
          </Routes>
        </div>
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
