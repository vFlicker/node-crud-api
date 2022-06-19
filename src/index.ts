import path from 'path'
import { config } from 'dotenv'

import { createServer } from './server'
import { users } from './data/users'
import { createProcesses } from './cluster'

config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) })

const PORT = (process.env.PORT || 3000) as number
const HOSTNAME = process.env.HOST_NAME || 'localhost'
const isMulti = process.env.MULTI

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
