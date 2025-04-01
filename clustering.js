const express = require("express");

const app = express();

app.get("/non-blocking", (req, res) => {
  res.send(`This api is light, non-blocking and fast`);
});

app.get("/heavy", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) sum += i;
  res.send(`Sum: ${sum}`);
});

app.listen(4000, () => console.log("Server running on port 4000"));
