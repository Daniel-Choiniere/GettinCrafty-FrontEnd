const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
