import db from 'db'

export default async function getCurrentUser(token: string) {
  const user = await db.user.findOne({ where: { token }, include: { tasks: true } })

  return user
}
