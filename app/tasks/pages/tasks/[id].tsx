import {Suspense} from 'react'
import {Head, Link, useRouter, useQuery} from 'blitz'
import getTask from 'app/tasks/queries/getTask'
import deleteTask from 'app/tasks/mutations/deleteTask'


export const Task = () => {
  const router = useRouter()
  const id = parseInt(router?.query.id as string)
  const [task] = useQuery(getTask, {where: {id}})

  return (
    <div>
      <h1>Task {task.id}</h1>
      <pre>
        {JSON.stringify(task)}
      </pre>

      <Link href="/tasks/[id]/edit" as={`/tasks/${task.id}/edit`}>
        <a>Edit</a>
      </Link>

        <button type="button" onClick={async () => {
          if (confirm("This will be deleted")) {
            await deleteTask({where: {id: task.id}})
            router.push('/tasks')
          }
        }}>
        Delete
      </button>
    </div>
  )
}

const ShowTaskPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          <Link href="/tasks">
            <a>Tasks</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Task />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowTaskPage

