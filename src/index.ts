import { createServer } from './server'
import { users } from './data/users'

const PORT = process.env.PORT || 3000

const server = createServer(users)
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
