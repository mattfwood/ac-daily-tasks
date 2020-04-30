import db from 'db';

export default async function resetTasks(args: any) {
  const { token } = args;

  const tasks = await db.task.updateMany({
    where: { User: { token } },
    data: { completed_at: null },
  });

  return tasks;
}
