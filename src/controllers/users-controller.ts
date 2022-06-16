import { IncomingMessage, ServerResponse } from 'http'

import UsersModel from '../models/users-model'
import { Error, User } from '../types'
import { getBodyData } from '../utils'

export default class UserController {
  constructor(private model: UsersModel) {}

  getUsers = async (_: IncomingMessage, res: ServerResponse) => {
    const users = await this.model.getUsers()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users))
  }

  getUser = async (_: IncomingMessage, res: ServerResponse, id: string) => {
    try {
      const user = await this.model.getUser(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(user))
    } catch (err) {
      const { status, message } = err as Error
      res.writeHead(status, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(message))
    }
  }

  addUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const body = await getBodyData(req)
      const user = JSON.parse(body) as User
      const newUser = await this.model.addUser(user)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newUser))
    } catch (err) {
      const { status, message } = err as Error
      res.writeHead(status, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(message))
    }
  }

  updateUser = async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string,
  ) => {
    try {
      const user = await this.model.getUser(id)
      const body = await getBodyData(req)
      const { username, age, hobbies } = JSON.parse(body) as User
      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }
      const updatedUser = await this.model.updateUser(id, userData)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updatedUser))
    } catch (err) {
      const { status, message } = err as Error
      res.writeHead(status, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(message))
    }
  }
}
