import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [setError] = useState([false]);

  const loadProductsBySell = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      title="Welcome to Gettin Crafty"
      description="Fun, customizable clothing and gifts!"
      className="container-fluid"
    >
      <div className="card-group">
        <div className="card border-0">
          <img alt="crafts" src={require("./images/hanging_hearts.webp")} />
        </div>

        <div className="card border-0">
          <img alt="crafts" src={require("./images/white_flower.webp")} />
        </div>

        <div className="card-border-0">
          <img alt="crafts" src={require("./images/cactus.webp")} />
        </div>
      </div>

      <div>
        <img
          alt="crafts"
          src={require("./images/gettincrafty_logo.jpg")}
          style={{ display: "block", margin: "auto" }}
        />
      </div>

      <Search />

      <br />
      <h2 className="mb-4 card-group-title">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4 card-group-title">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
