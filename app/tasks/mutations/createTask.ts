import db, {TaskCreateArgs} from 'db'

export default async function createTask(args: TaskCreateArgs) {
  const task = await db.task.create(args)

  return task
}
