// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { router } from "./router/index";

function App() {
  return (
    <Router>
      <div className="app-shell">
        <NavBar />

        <main className="app-main">
          <React.Suspense
            fallback={<div className="dgc-loading">Loading…</div>}
          >
            <Routes>
              {router.map((e, i) => (
                <Route path={e.path} element={<e.element />} key={i} />
              ))}
            </Routes>
          </React.Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;