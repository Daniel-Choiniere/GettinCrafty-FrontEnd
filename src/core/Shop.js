import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import Search from "./Search";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let skipAmount = skip + limit;
    getFilteredProducts(skipAmount, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(skipAmount);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More Products
        </button>
      )
    );
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop"
      description="Search for products"
      className="container-fluid"
    >
      <Search />
      <div className="row">
        <div className="col-4">
          <h4 className="dashboard-header">Filter By Categories</h4>
          <ul>
            <Checkbox
              catagories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>

          <h4 className="dashboard-header">Filter By Price Range</h4>

          <RadioBox
            prices={prices}
            handleFilters={filters => handleFilters(filters, "price")}
          />
        </div>

        <div className="col-8">
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-4">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
