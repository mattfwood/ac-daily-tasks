import db, { TaskUpdateArgs } from 'db'

export default async function updateTask(args: TaskUpdateArgs) {
  // Don't allow updating ID
  delete args.data.id

  const task = await db.task.update(args)

  return task
}
