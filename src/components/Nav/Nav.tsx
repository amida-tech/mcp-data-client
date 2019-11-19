import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import navLogo from "../../images/logo.svg";

const Nav: React.FC = () => {
  const history = useHistory();
  let [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state: any) => {
    setMenuOpen(state.isOpen);
  };

  // Yeah... we need all those ClassNames btw
  // https://www.npmjs.com/package/react-burger-menu
  return (
    <div className="nav-wrapper">
      <nav className="nav">
        <div
          className={"nav__logo-container"}
          onClick={() => {
            history.push("/");
          }}
        >
          <img className={"nav__logo"} src={navLogo} alt="logo" />
        </div>
        <Menu
          right
          className={"menu"}
          isOpen={menuOpen}
          menuClassName={"nav__menu"}
          itemClassName={"nav__menu-item"}
          burgerButtonClassName={"nav__menu-burger-button"}
          burgerBarClassName={"nav__menu-burger-bar"}
          crossButtonClassName={"nav__menu-cross-button"}
          crossClassName={"nav__menu-cross"}
          itemListClassName={"nav__menu-item-list"}
          overlayClassName={"nav__menu-overlay"}
          onStateChange={(state) => handleStateChange(state)}
        >
          <div className="nav__menu-welcome">
            <label>{"Welcome"}</label>
          </div>
          <Link
            to="/app/rating"
            onClick={() => setMenuOpen(false)}
          >
              {"Go to Rating Page"}
          </Link>
        </Menu>
      </nav>
      <div className="nav__spacer"></div>
    </div>
  );
};

export default Nav;
