import { validate, version } from 'uuid'

import { UserData } from '../types'

export const isUuidValidate = (uuid: string): boolean => {
  return validate(uuid) && version(uuid) === 4
}

export const isUserValidate = (user: UserData) => {
  if (
    typeof user.username === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies)
  ) {
    return true
  }

  return false
}

export const getUserId = (url: string) => url.split('/')[3]
export const matchUserId = (url: string) => url.match(/\/api\/users\/\w+/)
