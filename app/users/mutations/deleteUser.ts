import db, {UserDeleteArgs} from 'db'

export default async function deleteUser(args: UserDeleteArgs) {
  const user = await db.user.delete(args)

  return user
}
