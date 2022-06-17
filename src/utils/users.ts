import { UserData } from '../types'

export const userValidate = (user: UserData) => {
  if (
    typeof user.username !== 'string' ||
    typeof user.age !== 'number' ||
    !Array.isArray(user.hobbies)
  ) {
    return true
  }

  return false
}

export const getUserId = (url: string) => url.split('/')[3]
export const matchUserId = (url: string) => url.match(/\/api\/users\/\w+/)
