import db from 'db';

export default async function updateTask(args: any) {
  const { token, where, data } = args;

  const [task] = await db.task.findMany({
    where: { id: where.id, User: { token } },
  });

  if (!task) {
    throw new Error('You do not have permission to edit this task.');
  }

  delete data.id;

  const updatedTask = await db.task.update({ data, where });

  return updatedTask;
}
