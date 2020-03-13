import React, { useState, useEffect } from "react";
// import Layout from "./Layout";
import { getBraintreeClientToken } from "./apiCore";
// import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: ""
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = () => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ ...data, clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          {/* <div className="gorm-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea
              // onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div> */}

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button className="btn btn-success btn-block">Pay</button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
