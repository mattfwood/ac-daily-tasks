import db from "db";

// export default async function updateTask(args: TaskUpdateArgs) {
//   // Don't allow updating ID
//   delete args.data.id;

//   const task = await db.task.update(args)

//   return task
// }

export default async function updateTask(args: any) {
  const { token, where, data } = args;

  // fetch these directly from the database to avoid params being modified
  const [user, task] = await Promise.all([
    db.user.findOne({ where: { token } }),
    db.task.findOne({ where: { id: where.id } }),
  ]);

  if (task.userId !== user.id) {
    throw new Error("You do not have permission to edit this task.");
  }

  delete data.id;

  const updatedTask = await db.task.update({ data, where });

  return updatedTask;
}
