import http from 'http'

import UsersModel from './models/users-model'
import UserController from './controllers/users-controller'
import { users } from './data/users'

const PORT = process.env.PORT || 3000

const usersModel = new UsersModel(users)
const userController = new UserController(usersModel)

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    userController.getUsers(req, res)
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    userController.getUser(req, res, id)
  } else if (req.url === '/api/users' && req.method === 'POST') {
    userController.addUser(req, res)
  } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    userController.updateUser(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
