import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="home-page__header">
        <div>{"Amida React-GraphQL Skeleton"}</div>
        <div>{"Where would you like to go?"}</div>
      </header>
      <div>Click on the link menu to do something.</div>
    </div>
  );
};

export default HomePage;
