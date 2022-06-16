import { v4 as getId, validate } from 'uuid'

import { User } from '../types'
import { addUserValidate } from '../utils'

export default class UsersModel {
  constructor(private users: User[]) {}

  getUsers = async () => {
    return new Promise((resolve) => resolve(this.users))
  }

  getUser = async (id: string) => {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === id)

      if (!validate(id)) {
        return reject({
          status: 400,
          message: `User id "${id}" is invalid (not uuid)`,
        })
      }

      if (!user) {
        return reject({
          status: 404,
          message: `User with id "${id}" not found`,
        })
      }

      resolve(user)
    })
  }

  addUser = async (user: Omit<User, 'id'>) => {
    return new Promise((resolve, reject) => {
      if (addUserValidate(user)) {
        return reject({
          status: 400,
          message: 'User is missing required fields',
        })
      }

      const newUser = { id: getId(), ...user }
      this.users = [...this.users, newUser]
      resolve(newUser)
    })
  }
}
