import http from 'http'

import UsersModel from './models/users-model'
import UserController from './controllers/users-controller'
import { User } from './types'
import { getUserId, matchUserId } from './utils'

export const createServer = (data: User[]) => {
  const usersModel = new UsersModel(data)
  const userController = new UserController(usersModel)

  const server = http.createServer(async (req, res) => {
    try {
      /* GET ALL USERS */
      if (req.url === '/api/users' && req.method === 'GET') {
        return await userController.getUsers(req, res)
      }
      /* GET USER BY ID */
      if (req.url && matchUserId(req.url) && req.method === 'GET') {
        const id = getUserId(req.url)
        return await userController.getUser(req, res, id)
      }
      /* ADD USER */
      if (req.url === '/api/users' && req.method === 'POST') {
        return await userController.addUser(req, res)
      }
      /* UPDATE USER */
      if (req.url && matchUserId(req.url) && req.method === 'PUT') {
        const id = getUserId(req.url)
        return await userController.updateUser(req, res, id)
      }
      /* DELETE USER */
      if (req.url && matchUserId(req.url) && req.method === 'DELETE') {
        const id = getUserId(req.url)
        return await userController.deleteUser(req, res, id)
      }
      /* UNKNOWN REQUEST */
      res.writeHead(404, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Route not found' }))
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify('Something went wrong'))
    }
  })

  return server
}
