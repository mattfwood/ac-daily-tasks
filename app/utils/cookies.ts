import cookie from 'cookie'

export const serializeCookie = (token: string) =>
  cookie.serialize('ac-tasks', token, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72576000,
    httpOnly: true,
    path: '/',
  })
