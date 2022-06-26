export type UserData = {
  username: string
  age: number
  hobbies: string[]
}

export type User = {
  id: string
} & UserData

export type Error = {
  status: number
  message: string
}
