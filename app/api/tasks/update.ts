import { currentUser } from "./new"
import updateTask from "app/tasks/mutations/updateTask"

export default async (req, res) => {
  await currentUser(req, res)
  const { id, userId, ...changes } = req.body

  const task = await updateTask({
    where: { id },
    data: {
      ...changes,
    },
  })

  return res.json(task)
}
