import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCatagories } from "./apiAdmin";
// import { Link } from "react-router-dom";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    catagories: "",
    category: "",
    shipping: "",
    quantitiy: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    catagories,
    // category,
    // shipping,
    quantity,
    // loading,
    // error,
    // createdProduct,
    // redirectToProfile,
    formData
  } = values;

  const init = () => {
    getCatagories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          catagories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = name => event => {
    //   if name is 'photo' grap the img file, if not grab all the data
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // will set the form data for each field i.e. name, description, price, etc.
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantitiy: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newProductForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn, btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please Select A Category</option>
          {catagories &&
            catagories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please Select An Option</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity || 0}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  return (
    <Layout
      title="Add a new product"
      description={`Remember to smile ${user.name}!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newProductForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
