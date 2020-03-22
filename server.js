const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();

// Serve static assests if in production
if (process.env.NODE_ENV === "production") {
  // Set the static folder
  app.use(express.static("client/GettinCrafty/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
