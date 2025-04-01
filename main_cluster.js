const cluster = require("cluster");
const os = require("os");
const dirName = require("path").dirname;
const fileURLToPath = require("url").fileURLToPath;

const __dirname = dirName(fileURLToPath(import.meta.url));

const cpusCount = os.cpus().length;

console.log(`Number of CPUs: ${cpusCount}`);
console.log(`Master process PID: ${process.pid}`);

cluster.setupPrimary({
  exec: `${__dirname}/clustering.js`,
});

for (let i = 0; i < cpusCount; i++) {
  cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died`);
  console.log(`Worker exited with code: ${code}`);
  console.log("Starting a new worker");
  cluster.fork();
});

cluster.on("online", (worker) => {
  console.log(`Worker ${worker.process.pid} is online`);
});
