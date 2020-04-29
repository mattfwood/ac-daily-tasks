import db, { UserCreateArgs } from 'db';
import { generateToken } from 'app/utils/generateToken';
// import { transport } from 'app/utils/transport'
import mailClient from 'app/utils/email';

const initialTasks = [
  {
    name: 'Fossil #1',
    category: 'fossils',
  },
  {
    name: 'Fossil #2',
    category: 'fossils',
  },
  {
    name: 'Fossil #3',
    category: 'fossils',
  },
  {
    name: 'Fossil #4',
    category: 'fossils',
  },
  {
    name: 'Fossil #5',
    category: 'fossils',
  },
  {
    name: "Check Nook's Cranny",
    category: 'locations',
  },
  {
    name: 'Check Abel Sisters',
    category: 'locations',
  },
  {
    name: 'Check ATM for Nook Miles',
    category: 'locations',
  },
  {
    name: 'Find Money Rock',
    category: 'resources',
  },
  {
    name: 'Plant Money Tree',
    category: 'resources',
  },
  {
    name: 'Find Furniture In Tree',
    category: 'resources',
  },
  {
    name: 'Rock #1',
    category: 'resources',
  },
  {
    name: 'Rock #2',
    category: 'resources',
  },
];

export async function addStartingTasks(id) {
  const user = await db.user.update({
    where: { id: id },
    data: { tasks: { create: initialTasks } },
  });

  return user;
}

export default async function createUser(args: UserCreateArgs) {
  const params = {
    ...args,
    data: { ...args.data, email: args.data.email.toLowerCase() },
  };
  const existingUser = await db.user.findOne({
    where: {
      email: params.data.email,
    },
  });

  // find or create user by email
  // @TODO: set this a different way?
  const user = existingUser ? existingUser : await db.user.create(params);

  if (!existingUser) {
    await addStartingTasks(user.id);
  }

  // create auth token
  // @TODO:
  const token = user.token ? user.token : generateToken(user.email);

  if (process.env.NODE_ENV === 'production') {
    await mailClient.sendEmailWithTemplate({
      TemplateId: 17640272,
      From: 'verification@kahoy.org',
      To: user.email,
      TemplateModel: {
        product_name: 'Froggy Chores',
        action_url: `${process.env.ORIGIN}?token=${token}`,
        name: user.email,
      },
    });
  }

  // update user with latest auth token
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      token,
    },
  });

  return { success: true, url: `${process.env.ORIGIN}?token=${token}` };
}
