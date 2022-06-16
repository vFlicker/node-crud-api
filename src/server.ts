import http from 'http'

import UserController from './controllers/users-controller'

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const userController = new UserController()

  if (req.url === '/api/users' && req.method === 'GET') {
    userController.getUsers(req, res)
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    userController.getUser(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
