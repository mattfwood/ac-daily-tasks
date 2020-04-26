import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getUser from 'app/users/queries/getUser'
import deleteUser from 'app/users/mutations/deleteUser'


export const User = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [user] = useQuery(getUser, {where: {id}})

  return (
    <div>
      <h1>User {user.id}</h1>
      <pre>
        {JSON.stringify(user)}
      </pre>

      <Link href="/users/[id]/edit" as={`/users/${user.id}/edit`}>
        <a>Edit</a>
      </Link>

        <button type="button" onClick={async () => {
          if (confirm("This will be deleted")) {
            await deleteUser({where: {id: user.id}})
            router.push('/users')
          }
        }}>
        Delete
      </button>
    </div>
  )
}

const ShowUserPage = () => {
  return (
    <div className="container">
      <Head>
        <title>User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <User />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowUserPage

