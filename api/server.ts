import 'dotenv/config';
import cluster from "cluster"
import os from 'os';
import createServer from "./app";

const startServer = async () => {
  if(cluster.isPrimary) {
    const cpus = os.cpus().length;

    console.log(`Master: ${process.pid}`);
    console.log(`Starting ${cpus} workers...`);

    for(let i = 0; i < cpus; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.info(`Worker ${worker.process.pid} died.(code: ${code}, signal: ${signal}) restarting...`);
      cluster.fork();
    });
  } else {
    const app = await createServer();
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Worker ${process.pid} started and listening at http://localhost:${port}`);
      console.info(process.uptime());
    });
  }
}

startServer();