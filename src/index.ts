import { createServer } from './server'
import { users } from './data/users'

const port = 8000
const hostname = '127.0.0.1'

const server = createServer(users)
server.listen(port, hostname, () => console.log(`Listening on port ${port}`))
