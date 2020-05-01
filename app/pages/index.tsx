import { Head } from 'blitz';
import cookie from 'cookie';
import LoginForm from 'app/components/LoginForm';
import Navigation from 'app/components/Navigation';
import Page from 'app/components/Page';
import { serializeCookie } from 'app/utils/cookies';
import ListView from 'app/components/ListView';
import { COOKIE_KEY } from 'app/utils/constants';
import { Suspense } from 'react';
import { Spinner, Flex } from 'minerva-ui';

const Home = ({ loggedIn, ...props }) => {
  return (
    <div className="container">
      <Head>
        <title>Froggy Chores</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Navigation />

      <main>
        <Page>
          <Suspense
            fallback={
              <Flex justifyContent="center" p={6}>
                <Spinner size="32px" />
              </Flex>
            }
          >
            {!loggedIn ? <LoginForm /> : <ListView />}
          </Suspense>
        </Page>
      </main>

      <footer />

      <style jsx global>{`
        @font-face {
          font-family: 'Baloo';
          src: url('/fonts/Baloo2-Regular.ttf');
          font-weight: bold;
          font-display: auto;
          font-style: normal;
        }

        @font-face {
          font-family: 'BalooBold';
          src: url('/fonts/Baloo2-Bold.ttf');
          font-weight: bold;
          font-display: auto;
          font-style: normal;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Baloo', -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }

        *:focus {
          outline: 0;
        }

        button:focus {
          border-color: #a4cafe;
          box-shadow: 0 0 0 3px rgba(118, 169, 250, 0.45);
          outline: 0;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie ?? '');
  const token = context?.query?.token || cookies[COOKIE_KEY];
  const queryToken = context?.query?.token;

  // if there's no token in query string or cookies, return nothing
  if (!queryToken && !token) {
    return {
      props: {},
    };
  }

  if (context?.query?.token) {
    const queryToken = context?.query?.token;
    context.res.setHeader('Set-Cookie', serializeCookie(queryToken));
    // set their token to cookies, redirect them to the homepage
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return {
      props: {},
    };
  }

  // const user: any = token
  //   ? await ssrQuery(getCurrentUser, token, context)
  //   : null;

  const loggedIn = !!token;

  // if (user) {
  //   // @TODO: Fix this after finding datetime serialization workaround
  //   user.tasks = user?.tasks?.map((task) => ({
  //     ...task,
  //     created_at: task.created_at.toISOString(),
  //     completed_at: task?.completed_at?.toISOString() ?? null,
  //   }));
  // }

  return {
    props: {
      // user,
      loggedIn,
    },
  };
};

export default Home;
