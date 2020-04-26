import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getTask from 'app/tasks/queries/getTask'
import updateTask from 'app/tasks/mutations/updateTask'

export const EditTask = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [task] = useQuery(getTask, {where: {id}})

  return (
    <div>
      <h1>Edit Task {task.id}</h1>
      <pre>
        {JSON.stringify(task)}
      </pre>

      <form onSubmit={async (event) => {
        event.preventDefault()
        try {
          const updated = await updateTask({
            where: {id: task.id},
            data: {name: 'MyNewName'},
          })
          alert('Success!' + JSON.stringify(updated))
          router.push('/tasks/[id]', `/tasks/${updated.id}`)
        } catch (error) {
          alert('Error creating task ' + JSON.stringify(error, null, 2))
        }
      }}>
        <div>Put your form fields here. But for now, just click submit</div>
        <button>Submit</button>
      </form>
    </div>
  )
}

const EditTaskPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Edit Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditTask />
        </Suspense>

        <p>
          <Link href="/tasks">
            <a>Tasks</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export default EditTaskPage

