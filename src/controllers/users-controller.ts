import { IncomingMessage, ServerResponse } from 'http'

import UsersModel from '../models/users-model'
import { Error } from '../types'
import { getPostData } from '../utils'

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
      const body = await getPostData(req)
      const user = JSON.parse(body as string)
      const newUser = await this.model.addUser(user)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(newUser))
    } catch (err) {
      const { status, message } = err as Error
      res.writeHead(status, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(message))
    }
  }
}
