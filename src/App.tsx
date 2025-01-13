import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Exhibition from "./pages/Exhibition";
import Collection from "./pages/Collection";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Exhibition Curator</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exhibition/:id" element={<Exhibition />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
