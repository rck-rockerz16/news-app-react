import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsCategory from "./components/NewsCategory";
import NewsDetail from "./components/NewsDetail";
import SearchBar from "./components/SearchBar";

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <Router>
      <header>
        <h1>News App</h1>
      </header>
      <div className="container">
        <SearchBar />
        <main>
          <Routes>
            <Route
              path="/:category"
              element={<NewsCategory setArticles={setArticles} />}
            />
            <Route
              path="/news/:id"
              element={<NewsDetail articles={articles} />}
            />
            <Route
              path="/"
              element={<NewsCategory setArticles={setArticles} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
