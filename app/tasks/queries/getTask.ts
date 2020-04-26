import db, { FindOneTaskArgs } from 'db'

export default async function getTask(args: FindOneTaskArgs) {
  const task = await db.task.findOne(args)

  return task
}
