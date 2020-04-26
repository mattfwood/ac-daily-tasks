import {Head, Link, useRouter} from 'blitz'
import createUser from 'app/users/mutations/createUser'

const NewUserPage = () => {
  const router = useRouter()
  return (
    <div className="container">
      <Head>
        <title>New User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New User </h1>

        <form onSubmit={async (event) => {
          event.preventDefault()
          try {
            const user = await createUser({data: {name: 'MyName', email: 'email@email.com'}})
            alert('Success!' + JSON.stringify(user))
            router.push('/users/[id]', `/users/${user.id}`)
          } catch (error) {
            alert('Error creating user ' + JSON.stringify(error, null, 2))
          }
        }}>
          <div>Put your form fields here. But for now, just click submit</div>
          <button>Submit</button>
        </form>

        <p>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default NewUserPage

