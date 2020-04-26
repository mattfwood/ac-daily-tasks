import db, {FindManyUserArgs} from 'db'

export default async function getUsers(args: FindManyUserArgs) {
  const users = await db.user.findMany(args)

  return users
}
