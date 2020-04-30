import db from 'db';

export default async function getCurrentUser(token: string) {
  if (!token) return null;

  const user = await db.user.findOne({
    where: { token },
    include: { tasks: true },
  });

  return user;
}
