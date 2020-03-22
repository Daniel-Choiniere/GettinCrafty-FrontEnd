import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import "../styles.css";

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
      <h1 style={{ fontSize: "100px" }} className="homeTitle">
        {title}
      </h1>
      <p style={{ fontSize: "30px" }} className="lead homeTitle">
        {description}
      </p>
    </div>

    <div className={className}>{children}</div>
    <Footer />
  </div>
);

export default Layout;
