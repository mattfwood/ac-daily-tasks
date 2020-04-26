import db, {FindManyTaskArgs} from 'db'

export default async function getTasks(args: FindManyTaskArgs) {
  const tasks = await db.task.findMany(args)

  return tasks
}
