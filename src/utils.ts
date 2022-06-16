import { IncomingMessage } from 'http'

import { UserData } from './types'

export const addUserValidate = (user: UserData) => {
  if (
    typeof user.username !== 'string' ||
    typeof user.age !== 'number' ||
    !Array.isArray(user.hobbies)
  ) {
    return true
  }

  return false
}

export const getBodyData = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}
