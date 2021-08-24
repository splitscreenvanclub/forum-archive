import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import '../styles/styles.css';

function ForumArchive({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Split Screen Van Club | Forum Archive</title>
        <link
          rel="icon"
          href="https://hubble-live-assets.s3.amazonaws.com/ssvc/theme/icon/1/logo-favion.png"
        />
      </Head>
      <div className="flex flex-col items-center min-h-screen py-2">
        <header className="flex px-20 py-4 w-full mb-8 bg-white border-b border-gray-100 space-x-8">
          <div>
            <a href="https://www.ssvc.org.uk/">
              <img
                alt="The Split Screen Van Club"
                src="https://hubble-live-assets.s3.amazonaws.com/ssvc/theme/logo/1/logo_logo-colour.png"
                className="w-32"
              />
            </a>
          </div>
          <nav className="flex-grow">
            <ul className="flex items-center space-x-6 h-full text-xl font-bold justify-between">
              <li className="">Forum Archive - 2000-21</li>
              <li className="">
                <a
                  href="https://www.ssvc.org.uk/"
                  className="bg-accent px-4 py-2 text-white rounded-sm hover:bg-accent-lighter"
                >
                  Home
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex flex-col w-full px-20 mb-8 flex-grow">
          <Component {...pageProps} />
        </main>
        <footer className="flex items-center justify-center w-full h-24 border-t">
          The Split Screen Van Club 1983 - 2021
        </footer>
      </div>
    </>
  );
}

export default ForumArchive
