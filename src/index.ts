import path from 'path'
import { config } from 'dotenv'

import { createServer } from './server'
import { users } from './data/users'

config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
})

const port = (process.env.PORT || 3000) as number
const hostname = process.env.HOST_NAME || 'localhost'

const server = createServer(users)
server.listen(port, hostname, () => console.log(`Listening on port ${port}`))
