import { IncomingMessage } from 'http'

import { User } from './types'

export const addUserValidate = (user: Omit<User, 'id'>) => {
  if (
    typeof user.username !== 'string' ||
    typeof user.age !== 'number' ||
    !Array.isArray(user.hobbies)
  ) {
    return true
  }

  return false
}

export const getPostData = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}
