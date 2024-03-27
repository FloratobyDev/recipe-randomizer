const express = require("express");

const app = express();
const PORT = process.env.PORT || 4242;

app.get("/hello", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4242");
});
