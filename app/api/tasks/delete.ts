import { currentUser } from './new'
// import updateTask from 'app/tasks/mutations/updateTask'
import deleteTask from 'app/tasks/mutations/deleteTask'
import getTask from 'app/tasks/queries/getTask'

export default async (req, res) => {
  const user = await currentUser(req, res)
  const { id } = req.body

  console.log({ id, })

  const task = await getTask({ where: { id: id } });
  console.log({ task })

  if (task.userId !== user.id) {
    throw new Error('You do not have permission to edit this task')
  }

  await deleteTask({
    where: { id },
  })

  return res.json({ success: true, message: 'Task Deleted' })
}
