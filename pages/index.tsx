import Container from '../components/_Layout/Container';
import Head from 'next/head';
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BoilerNext - Home</title>
        <meta name="description" content="BoilerNext - A NextJS - Tailwind - Typescript Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className='my-8'>
          <h1 className='text-2xl font-bold'>Hello Next.js</h1>
        </div>
      </Container>
    </div>
  )
}

export default Home
