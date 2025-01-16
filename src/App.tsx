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

const App: React.FC = () => (
  <AllProviders>
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/met" element={<MetMuseumPage />} />
          <Route path="/chicago" element={<ChicagoMuseumPage />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  </AllProviders>
);

export default App;
