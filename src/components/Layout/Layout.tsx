import React from "react";
import Nav from "../Nav/Nav";
import "./Layout.scss";

const Layout: React.FC = (props) => {
  return (
    <div className={"layout"}>
      <Nav />
      <div className="layout__main-content">
          {props.children}
      </div>
    </div>
  );
};

export default Layout;
