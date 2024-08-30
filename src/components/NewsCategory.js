import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { useParams, useLocation, Link } from "react-router-dom";

const NewsCategory = ({ setArticles }) => {
  const [articles, setLocalArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { category = "general" } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLocalArticles([]);
    setPage(1);
    setHasMore(true);
  }, [category, location.search]);

  useEffect(() => {
    setArticles(articles);
  }, [articles, setArticles]);

  const loadMoreArticles = async () => {
    const apiKey = "8c0f4b3c3cb64d568210b7f903a4fcae"; // Replace with your actual API key
    const query = new URLSearchParams(location.search).get("q");
    const url = query
      ? `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${apiKey}`
      : `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const newArticles = response.data.articles;

      setLocalArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage((prevPage) => prevPage + 1);

      if (newArticles.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreArticles}
        hasMore={hasMore}
        loader={<div key={0}>Loading...</div>}
      >
        <div className="news-grid">
          {articles.map((article, index) => (
            <Link to={`/news/${index}`} key={index} className="news-card">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="article"
                  className="news-card-image"
                />
              )}
              <div className="news-card-content">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p className="date">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default NewsCategory;
