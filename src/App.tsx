import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Exhibitions from "./pages/Exhibitions";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
