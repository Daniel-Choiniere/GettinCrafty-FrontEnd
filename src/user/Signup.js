import React, { useState } from "react";
import Layout from "../core/Layout";
import { API } from "../config";

const Signup = () => (
  <Layout title="Signup" description="Signup to start Gettin Crafty!">
    {API}
  </Layout>
);

export default Signup;

// const signUpForm = () => (
//   <form>
//     <div className="form-group">
//       <label className="text-muted">Name</label>
//       <input
//         onChange={handleChange("name")}
//         type="text"
//         className="form-control"
//         value={name}
//       />
//     </div>

//     <div className="form-group">
//       <label className="text-muted">Email</label>
//       <input
//         onChange={handleChange("email")}
//         type="email"
//         className="form-control"
//         value={email}
//       />
//     </div>

//     <div className="form-group">
//       <label className="text-muted">Password</label>
//       <input
//         onChange={handleChange("password")}
//         type="password"
//         className="form-control"
//         value={password}
//       />
//     </div>
//     <button onClick={clickSubmit} className="btn btn-primary">
//       Submit
//     </button>
//   </form>
// );
