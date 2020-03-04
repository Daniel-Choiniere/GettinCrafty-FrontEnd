import React, { useState, useEffect } from "react";
import Layout from "./Layout";
// import Card from "./Card";
import { getCatagories } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [catagories, setCatagories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCatagories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCatagories(data);
      }
    });
  };

  useEffect(() => {
    init();
  });

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  return (
    <Layout
      title="Shop"
      description="Search for products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter By Catagories</h4>
          <ul>
            <Checkbox
              catagories={catagories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter By Price Range</h4>
          <ul>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </ul>
        </div>

        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
