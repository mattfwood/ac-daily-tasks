import cookie from 'cookie';
import { COOKIE_KEY } from './constants';

export const serializeCookie = (token: string) =>
  cookie.serialize(COOKIE_KEY, token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72576000,
    httpOnly: false,
    path: '/',
  });
