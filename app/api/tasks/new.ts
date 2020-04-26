import getCurrentUser from "app/users/queries/getCurrentUser"
import cookie from 'cookie';
import createTask from "app/tasks/mutations/createTask";

export const currentUser = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');

  const token = cookies['ac-tasks']

  if (!token) {
    // return res.json({ success: false, message: 'Token Not Valid' })
    throw new Error('Token Not Valid')
  }

  const user = await getCurrentUser(token);

  return user;
}

export default async (req, res) => {
  const user = await currentUser(req, res);

  const task = await createTask({ data: { ...req.body, user: { connect: { id: user.id } } } })

  return res.json(task);
}