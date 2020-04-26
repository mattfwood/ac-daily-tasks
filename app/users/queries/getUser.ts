import db, {FindOneUserArgs} from 'db'

export default async function getUser(args: FindOneUserArgs) {
  const user = await db.user.findOne(args)

  return user
}
