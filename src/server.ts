import http from 'http'

import UsersModel from './models/users-model'
import UserController from './controllers/users-controller'
import { users } from './data/users'
import { getUserId, matchUserId } from './utils'

const PORT = process.env.PORT || 3000

const usersModel = new UsersModel(users)
const userController = new UserController(usersModel)

const server = http.createServer((req, res) => {
  /* GET ALL USERS */
  if (req.url === '/api/users' && req.method === 'GET') {
    return userController.getUsers(req, res)
  }
  /* GET USER BY ID */
  if (req.url && matchUserId(req.url) && req.method === 'GET') {
    const id = getUserId(req.url)
    return userController.getUser(req, res, id)
  }
  /* ADD USER */
  if (req.url === '/api/users' && req.method === 'POST') {
    return userController.addUser(req, res)
  }
  /* UPDATE USER */
  if (req.url && matchUserId(req.url) && req.method === 'PUT') {
    const id = getUserId(req.url)
    return userController.updateUser(req, res, id)
  }
  /* DELETE USER */
  if (req.url && matchUserId(req.url) && req.method === 'DELETE') {
    const id = getUserId(req.url)
    return userController.deleteUser(req, res, id)
  }
  /* UNKNOWN REQUEST */
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Route not found' }))
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
