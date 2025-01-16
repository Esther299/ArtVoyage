import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Search } from "./pages/Search";
import MetMuseumPage from "./pages/MetMuseumSearch";
import ChicagoMuseumPage from "./pages/ChicagoMuseumSearch";
import AllProviders from "./context/AllProviders";
import Exhibitions from "./pages/Exhibitions";
import Auth from "./pages/Auth";
import { useAuth } from "./context/AuthContext";

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user && <NavBar />}
      <Routes>
        {user ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/met" element={<MetMuseumPage />} />
            <Route path="/chicago" element={<ChicagoMuseumPage />} />
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
