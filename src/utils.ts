import cluster from 'cluster';
import os from 'os';

import { Application } from './framework';

export const createProcesses = (app: Application) => {
  if (cluster.isPrimary) {
    const cpuCounts = os.cpus().length;

    for (let index = 0; index < cpuCounts; index++) {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log(`Worker is dead: ${worker.process.pid}`);
      });
    }
  }

  if (cluster.isWorker) {
    console.log(`Worker ${process.pid}`);
    app.run();
  }
};
