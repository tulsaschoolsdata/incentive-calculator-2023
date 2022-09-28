import Head from 'next/head'
import Logo from './logo'

export default function Layout({ children }) {
  return (
    <div className={'container max-w-3xl'}>
      <Head>
        <title>Tulsa Public Schools - Retention Incentive Calculator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cfb7oxy.css" />
      </Head>

      <header>
        <div className={'w-24 mx-auto relative'}>
          <Logo />
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer>
      </footer>
    </div>
  )
}