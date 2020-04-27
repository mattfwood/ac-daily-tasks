import { Head, ssrQuery } from "blitz"
import cookie from "cookie"
import LoginForm from "app/components/LoginForm"
import Navigation from "app/components/Navigation"
import Page from "app/components/Page"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { serializeCookie } from "app/utils/cookies"
import ListView from "app/components/ListView"

const Home = ({ user, ...props }) => {
  return (
    <div className="container">
      <Head>
        <title>Froggy Chores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation user={user} />

      <main>
        <Page>{!user ? <LoginForm /> : <ListView user={user} />}</Page>
      </main>

      <footer />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Baloo 2", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  if (context?.query?.token) {
    const queryToken = context?.query?.token
    context.res.setHeader("Set-Cookie", serializeCookie(queryToken))
    // set their token to cookies, redirect them to the homepage
    context.res.writeHead(302, { Location: "/" })
    context.res.end()
    return {}
  }

  const cookies = cookie.parse(context.req.headers.cookie ?? "")

  const token = context?.query?.token || cookies["ac-tasks"]

  // @TODO: Fix this after finding datetime serialization workaround
  const user: any = token ? await ssrQuery(getCurrentUser, token, context) : null

  if (user) {
    user.tasks = user?.tasks?.map((task) => ({
      ...task,
      created_at: task.created_at.toISOString(),
      completed_at: task?.completed_at?.toISOString() ?? null,
    }))
  }

  return {
    props: {
      user,
    },
  }
}

export default Home
