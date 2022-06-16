import { validate } from 'uuid'

import { users } from '../data'

export default class UsersModel {
  getUsers = async () => {
    return new Promise((resolve) => resolve(users))
  }

  getUser = async (id: string) => {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id)

      if (!validate(id)) {
        reject({
          status: 400,
          message: `User id "${id}" is invalid (not uuid)`,
        })
      }

      if (!user) {
        reject({
          status: 404,
          message: `User with id "${id}" not found`,
        })
      }

      resolve(user)
    })
  }
}
