import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <div>{"Amida React-GraphQL Skeleton"}</div>
        <div>{"Where would you like to go?"}</div>
        <div>
          <Link to={"/app/rating"}>
            {"Go to Rating Page"}
          </Link>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
