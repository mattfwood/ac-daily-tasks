import db from 'db';

export default async function createTask(args: any) {
  const { data, token } = args;
  const user = await db.user.findOne({ where: { token } });

  const task = await db.task.create({
    data: { ...data, User: { connect: { id: user.id } } },
  });

  return task;
}
