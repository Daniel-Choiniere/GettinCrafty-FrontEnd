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

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB Connection error: ${err.message}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
