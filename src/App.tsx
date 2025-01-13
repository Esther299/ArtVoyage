import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Search } from "./pages/Search";
import { Exhibitions } from "./pages/Exhibitions";
import { PrivateRoute } from "./components/PrivateRoute";

const App: React.FC = () => (
  <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/exhibitions"
          element={
            <PrivateRoute>
              <Exhibitions />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
