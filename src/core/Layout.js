import React from "react";
import Menu from "./Menu";
import "../styles.css";
import Search from "./Search";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <div class="container">
        <div class="jumbotron-cover-image">
          <div class="container"></div>
        </div>
      </div>
      <h2>{title}</h2>
      <p className="lead">{description}</p>
      <Search />
    </div>

    <div className={className}>{children}</div>
  </div>
);

export default Layout;
