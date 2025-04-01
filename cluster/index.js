import express from "express";

const app = express();

app.get("/non-blocking", (req, res) => {
  res.send(`This api is light, non-blocking and fast`);
});

app.get("/heavy", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 5e10; i++) sum += i;
  res.send(`Cluster :: Sum: ${sum}`);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
  console.log(`Worker process PID: ${process.pid}`);
});
