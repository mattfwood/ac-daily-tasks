import { Head } from "blitz"
import axios from 'axios';
import Navigation from "app/components/Navigation"
import Page from "app/components/Page"

const VillagersPage = (props) => {
  // console.log(props);

  return (
  <div className="container">
    <Head>
      <title>ac-daily-tasks</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navigation />

    <main>
      <Page>
        Villagers
        {/* <LoginForm />
        <Checklist /> */}
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
)
}

export async function getStaticProps(context) {
  const res = await axios.get('http://acnhapi.com/villagers');

  const villagers = Object.keys(res.data);

  console.log({ villagers })

  const images = [];
  for (let villager of villagers) {
    const image = await axios.get(`http://acnhapi.com/images/villagers/${villager}`)
    images.push(image.data);
  }


  return {
    props: {
      data: res.data,
      images,
    }, // will be passed to the page component as props
  }
}

export default VillagersPage
