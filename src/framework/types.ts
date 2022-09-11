import { IncomingMessage, ServerResponse } from 'http';

export type Request = IncomingMessage & {
  params: Record<string, string>;
};

export type Response = ServerResponse;
