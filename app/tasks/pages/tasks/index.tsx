import {Suspense} from 'react'
import {Head, Link, useQuery} from 'blitz'
import getTasks from 'app/tasks/queries/getTasks'

export const TasksList = () => {
  const [tasks] = useQuery(getTasks)

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Link href="/tasks/[id]" as={`/tasks/${task.id}`}>
            <a>{task.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const TasksPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Tasks</h1>

        <p>
          <Link href="/tasks/new">
            <a>Create Task</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TasksList />
        </Suspense>
      </main>
    </div>
  )
}

export default TasksPage



