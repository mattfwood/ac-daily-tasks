import db, {UserUpdateArgs} from 'db'

export default async function updateUser(args: UserUpdateArgs) {
  // Don't allow updating ID
  delete args.data.id

  const user = await db.user.update(args)

  return user
}
