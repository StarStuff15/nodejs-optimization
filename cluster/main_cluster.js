import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpusCount = os.availableParallelism();

console.log(
  `Master process PID: ${process.pid}, Spawning ${cpusCount} workers`
);

cluster.setupPrimary({ exec: __dirname + `/index.js` });

for (let i = 0; i < cpusCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died`);
  console.log(`Starting a new worker`);
  cluster.fork();
});

cluster.on("online", (worker) => {
  console.log(`Worker ${worker.process.pid} is online`);
});

cluster.on("listening", (worker, address) => {
  console.log(
    `Worker ${worker.process.pid} is listening on ${address.address}:${address.port}`
  );
});
