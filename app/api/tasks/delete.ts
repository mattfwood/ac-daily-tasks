import db from 'db';
import cookie from 'cookie';
import getTask from 'app/tasks/queries/getTask';
import getCurrentUser from 'app/users/queries/getCurrentUser';
import { COOKIE_KEY } from 'app/utils/constants';

export const currentUser = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');

  const token = cookies[COOKIE_KEY];

  if (!token) {
    // return res.json({ success: false, message: 'Token Not Valid' })
    throw new Error('Token Not Valid');
  }

  const user = await getCurrentUser(token);

  return user;
};

export default async (req, res) => {
  const user = await currentUser(req, res);
  const { id } = req.body;

  const task = await getTask({ where: { id: id } });

  if (task.userId !== user.id) {
    throw new Error('You do not have permission to edit this task');
  }

  await db.task.delete({
    where: { id },
  });

  return res.json({ success: true, message: 'Task Deleted' });
};
