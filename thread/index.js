import express from "express";
import { Worker } from "worker_threads";

const app = express();

app.get("/non-blocking", (req, res) => {
  res.send(`This api is light, non-blocking and fast`);
});

app.get("/heavy", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 5e10; i++) sum += i;
  res.send(`Sum: ${sum}`);
});

app.get("/heavy-with-worker-thread", (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (sum) => {
    res.send(`Sum: ${sum}`);
  });

  worker.on("error", (error) => {
    console.error("Worker error:", error);
    res.status(500).send("Internal Server Error");
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
});

console.log("Network process ID:", process.pid);

app.listen(3000, () => console.log("Server running on port 3000"));
