import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = ({ articles }) => {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="news-detail">
      <h1>{article.title}</h1>
      <p className="date">
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="article"
          className="news-detail-image"
        />
      )}
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read full article
      </a>
    </div>
  );
};

export default NewsDetail;
