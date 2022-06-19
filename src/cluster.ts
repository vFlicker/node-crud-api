import cluster from 'cluster'
import { cpus } from 'os'

const numCPUs = cpus().length

export const createProcesses = (callback: () => void) => {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork()
      worker.on('exit', () => {
        console.log(`Worker is dead: ${worker.process.pid}`)
      })
    }
  }

  if (cluster.isWorker) {
    callback()
  }
}
