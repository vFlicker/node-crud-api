import { v4 as getId } from 'uuid'

import { User } from './types'

export const users: User[] = [
  {
    id: getId(),
    username: 'Bob',
    age: 20,
    hobbies: ['sport', 'music'],
  },
  {
    id: getId(),
    username: 'Vlad',
    age: 24,
    hobbies: ['sport', 'music', 'movies'],
  },
]
