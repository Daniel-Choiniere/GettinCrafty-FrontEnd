import React, { useState, useEffect } from "react";

const Checkbox = ({ catagories }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = c => () => {
    const currentChecked = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];

    if (currentChecked === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentChecked, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
  };

  return catagories.map((c, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{c.name}</label>
    </li>
  ));
};

export default Checkbox;
