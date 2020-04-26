import db, { UserCreateArgs } from 'db'
import { generateToken } from 'app/utils/generateToken'
import { transport } from 'app/utils/transport'

export default async function createUser(args: UserCreateArgs) {
  const existingUser = await db.user.findOne({
    where: {
      email: args.data.email,
    },
  })

  // find or create user by email
  const user = existingUser ? existingUser : await db.user.create(args)

  // create auth token
  const token = generateToken(user.email)

  // email them auth token
  const response = await transport.sendMail({
    from: 'm.wood0904@gmail.com',
    to: user.email,
    subject: 'Sign In to Animal Crossing Daily Tasks',
    html: `<a href="${process.env.ORIGIN}?token=${token}">Sign In</a>`,
  })

  // update user with latest auth token
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      token,
    },
  })

  return { success: true }
}
