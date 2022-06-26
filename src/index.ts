import { config } from './config'
import { createServer } from './server'
import { users } from './data/users'
import { createProcesses } from './cluster'

const PORT = config.PORT || 3000
const HOSTNAME = config.HOST_NAME || 'localhost'
const isMulti = config.MULTI

const workerHandler = () => {
  server.listen(PORT, HOSTNAME, () => {
    console.log(`Listening on port on port: ${PORT}`)
    console.log(`PID process: ${process.pid}`)
  })
}

const server = createServer(users)
if (isMulti) {
  createProcesses(workerHandler)
} else {
  server.listen(PORT, HOSTNAME, () => console.log(`Listening on port: ${PORT}`))
}
