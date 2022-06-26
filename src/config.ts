import path from 'path'
import dotenv from 'dotenv'

type Config = {
  HOST_NAME?: string
  PORT?: number
  MULTI?: boolean
}

const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'
dotenv.config({ path: path.resolve(process.cwd(), envFile) })

const boolean = (value?: string): boolean => value === 'true'

export const config: Config = {
  HOST_NAME: process.env.HOST_NAME,
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  MULTI: process.env.MULTI ? boolean(process.env.MULTI) : undefined,
}
