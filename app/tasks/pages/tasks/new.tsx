import {Head, Link, useRouter} from 'blitz'
import createTask from 'app/tasks/mutations/createTask'

const NewTaskPage = () => {
  const router = useRouter()
  return (
    <div className="container">
      <Head>
        <title>New Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Task </h1>

        <form onSubmit={async (event) => {
          event.preventDefault()
          try {
            const task = await createTask({data: {name: 'MyName'}})
            alert('Success!' + JSON.stringify(task))
            router.push('/tasks/[id]', `/tasks/${task.id}`)
          } catch (error) {
            alert('Error creating task ' + JSON.stringify(error, null, 2))
          }
        }}>
          <div>Put your form fields here. But for now, just click submit</div>
          <button>Submit</button>
        </form>

        <p>
          <Link href="/tasks">
            <a>Tasks</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default NewTaskPage

