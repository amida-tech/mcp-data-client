import React from "react";
import logo from "../../images/logo.svg";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <img src={logo} className="home-page__logo" alt="logo" />
        Amida React-GraphQL Skeleton
      </header>
    </div>
  );
};

export default HomePage;
