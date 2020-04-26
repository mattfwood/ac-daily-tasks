import { Suspense } from 'react'
import { Head, Link, useQuery } from 'blitz'
import getUsers from 'app/users/queries/getUsers'

export const UsersList = () => {
  const [users] = useQuery(getUsers)

  console.log({ users })

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href="/users/[id]" as={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const UsersPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Users</h1>

        <p>
          <Link href="/users/new">
            <a>Create User</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <UsersList />
        </Suspense>
      </main>
    </div>
  )
}

export default UsersPage
