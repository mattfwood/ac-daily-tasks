import db, {TaskDeleteArgs} from 'db'

export default async function deleteTask(args: TaskDeleteArgs) {
  const task = await db.task.delete(args)

  return task
}
