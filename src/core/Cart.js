import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import Search from "./Search";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <div>
        <h3>
          <Link to="/shop">Continue Shopping</Link>
        </h3>
        <h2>You have {`${items.length}`} item(s) in your cart!</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsNessage = () => (
    <h2>
      Your shopping cart is empty. <br />{" "}
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  // const refreshPage = () => {
  //   window.location.reload();
  // }

  return (
    <Layout
      title="Cart"
      description="Manage your cart items"
      className="container-fluid"
    >
      <Search />

      {/* <button
        onClick={refreshPage()}
        className="btn btn-outline-danger mt-2 mb-2"
      >
        {" "}
        Update Cart
      </button> */}

      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsNessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">Checkout</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
