import { users } from '../data'

export default class UsersModel {
  getUsers = async () => {
    return new Promise((resolve) => resolve(users))
  }
}
