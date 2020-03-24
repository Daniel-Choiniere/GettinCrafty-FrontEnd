const express = require("express");
// const compression = require("compression");
const path = require("path");
const app = express();

// app.use(compression());
// app.use(express.static(path.join(__dirname, "client", "build")));

// app.get("*", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
