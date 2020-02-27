import React from "react";

const Checkbox = ({ catagories }) => {
  return catagories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
