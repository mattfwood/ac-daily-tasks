import { Head, ssrQuery } from "blitz"
import cookie from 'cookie';
import LoginForm from "app/components/LoginForm"
import Navigation from "app/components/Navigation"
import Checklist from "app/components/Checklist"
import Page from "app/components/Page"
import getCurrentUser from "app/users/queries/getCurrentUser";

const Home = ({ user, ...props}) => {
  console.log({ props })

  return (
  <div className="container">
    <Head>
      <title>ac-daily-tasks</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

      <Navigation user={user} />

    <main>
      <Page>
        <LoginForm />
        {/* <Checklist /> */}
      </Page>
    </main>

    <footer>
    </footer>

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
);
}

export const getServerSideProps = async (context) => {
  // console.log(context);
  const cookies = cookie.parse(context.req.headers.cookie ?? '');
  console.log(cookies);
  // console.log({ cookies });

  if (cookies['ac-tasks']) {

  }

  const token = cookies['ac-tasks'];

  const user = token ? await ssrQuery(getCurrentUser, token, context) : null

  return {
    props: {
      user
    }
  };
}

export default Home
