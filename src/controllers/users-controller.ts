import { IncomingMessage, ServerResponse } from 'http'
import UsersModel from '../models/users-model'

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
}
