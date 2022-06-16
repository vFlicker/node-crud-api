import http from 'http'

import UserController from './controllers/users-controller'

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const userController = new UserController()

  if (req.url === '/api/users' && req.method === 'GET') {
    userController.getUsers(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
