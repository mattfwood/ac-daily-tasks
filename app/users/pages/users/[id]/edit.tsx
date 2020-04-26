import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getUser from 'app/users/queries/getUser'
import updateUser from 'app/users/mutations/updateUser'

export const EditUser = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [user] = useQuery(getUser, {where: {id}})

  return (
    <div>
      <h1>Edit User {user.id}</h1>
      <pre>
        {JSON.stringify(user)}
      </pre>

      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          const updated = await updateUser({
            where: {id: user.id},
            data: {name: 'MyNewName'},
          })
          alert('Success!' + JSON.stringify(updated))
          router.push('/users/[id]', `/users/${updated.id}`)
        } catch (error) {
          alert('Error creating user ' + JSON.stringify(error, null, 2))
        }
      }}>
        <div>Put your form fields here. But for now, just click submit</div>
        <button>Submit</button>
      </form>
    </div>
  )
}

const EditUserPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Edit User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditUser />
        </Suspense>

        <p>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default EditUserPage

