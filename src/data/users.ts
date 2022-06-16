import { v4 as getId } from 'uuid'

import { User } from '../types'

export const users: User[] = [
  {
    id: getId(),
    username: 'Bob',
    age: 99,
    hobbies: ['sport', 'music'],
  },
]
