import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <nav className="nav" style={{ backgroundColor: "#688d87" }}>
    <li className="nav-item navbar-text">
      <Link className="nav-link" style={isActive(history, "/")} to="/">
        Home
      </Link>
    </li>

    <li className="nav-item navbar-text">
      <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">
        Shop
      </Link>
    </li>

    <li className="nav-item navbar-text">
      <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">
        Cart{" "}
      </Link>
    </li>
  </nav>
);

export default withRouter(Menu);
