import { v4 as getId, validate } from 'uuid'

import { User, UserData } from '../types'
import { addUserValidate } from '../utils'

export default class UsersModel {
  constructor(private users: User[]) {}

  getUsers = async () => {
    return new Promise((resolve) => resolve(this.users))
  }

  getUser = async (id: string): Promise<User> => {
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

  addUser = async (user: UserData) => {
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

  updateUser = async (id: string, user: UserData) => {
    return new Promise((resolve) => {
      const index = this.users.findIndex((user) => user.id === id)
      const updatedUser = { id, ...user }
      this.users = [
        ...this.users.slice(0, index),
        updatedUser,
        ...this.users.slice(index + 1),
      ]
      resolve(updatedUser)
    })
  }

  deleteUser = async (id: string) => {
    return new Promise((resolve) => {
      const index = this.users.findIndex((user) => user.id === id)
      this.users = [
        ...this.users.slice(0, index),
        ...this.users.slice(index + 1),
      ]
      resolve({ message: 'User deleted' })
    })
  }
}
