import { IncomingMessage, ServerResponse } from 'http'

import UsersModel from '../models/users-model'
import { Error } from '../types'

export default class UserController {
  private model: UsersModel

  constructor() {
    this.model = new UsersModel()
  }

  getUsers = async (_: IncomingMessage, res: ServerResponse) => {
    try {
      const users = await this.model.getUsers()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(users))
    } catch (err) {
      console.log(err)
    }
  }

  getUser = async (_: IncomingMessage, res: ServerResponse, id: string) => {
    try {
      const user = await this.model.getUser(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(user))
    } catch (err: unknown) {
      const { status, message } = err as Error
      res.writeHead(status, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(message))
    }
  }
}
