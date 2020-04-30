import db from 'db';

export default async function createTask(args: any) {
  const { data, token } = args;

  const task = await db.task.create({
    data: { ...data, User: { connect: { token } } },
  });

  return task;
}
