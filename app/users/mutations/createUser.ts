import db, { UserCreateArgs } from 'db'
import { generateToken } from 'app/utils/generateToken'
import { transport } from 'app/utils/transport'
import mailClient from 'app/utils/email'

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
  // const response = await transport.sendMail({
  //   from: 'm.wood0904@gmail.com',
  //   to: user.email,
  //   subject: 'Sign In to Animal Crossing Daily Tasks',
  //   html: `<a href="${process.env.ORIGIN}?token=${token}">Sign In</a>`,
  // })

  const response = await mailClient
    .sendEmailWithTemplate({
      TemplateId: 17640272,
      From: 'verification@kahoy.org',
      To: user.email,
      TemplateModel: {
        product_name: 'Animal Crossing Tasks',
        action_url: `${process.env.ORIGIN}?token=${token}`,
        name: user.email,
      },
    })
    .then((response) => {
      console.log('Sending message')
      console.log(response.To)
      console.log(response.Message)
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
