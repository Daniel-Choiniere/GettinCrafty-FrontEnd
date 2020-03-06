import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });
  return (
    <div>
      <h2>Search Bar</h2>
    </div>
  );
};

export default Search;
