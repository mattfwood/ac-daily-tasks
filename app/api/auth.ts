import getCurrentUser from "app/users/queries/getCurrentUser"
import cookie from 'cookie';

const serializeCookie = (token: string) => cookie.serialize('ac-tasks', token, {
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 72576000,
  httpOnly: true,
  path: '/',
})

export default async (req, res) => {
  // console.log(req.query);
  const { token } = req.query
  if (!token) {
    return res.json({ success: false, message: 'Token not valid' })
  }

  const user = await getCurrentUser(token);

  // res.cookies('ac-daily-tasks', token, {
  //   httpOnly: true,
  // })

  res.setHeader('Set-Cookie', serializeCookie(token))
  res.status(200).end();
  // return res.json(user)
}
