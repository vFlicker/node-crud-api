import 'dotenv/config';

type Config = {
  NODE_ENV?: string;
  HOST_NAME?: string;
  PORT?: number;
  MULTI?: boolean;
};

const isTrue = (value?: string): boolean => value === 'true';

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV,
  HOST_NAME: process.env.HOST_NAME,
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  MULTI: process.env.MULTI ? isTrue(process.env.MULTI) : undefined,
};
