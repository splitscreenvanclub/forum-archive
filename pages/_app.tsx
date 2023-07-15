import 'tailwindcss/tailwind.css'
import '../app/globals.css';

export default function({ Component, pageProps }) {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        <header className="py-4 w-full mb-8 bg-white border-b border-gray-100">
          <div className="flex mx-auto xl:max-w-screen-xl space-x-8 px-6">
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
                <li className="hidden md:block">
                  <a
                    href="https://www.ssvc.org.uk/"
                    className="bg-accent px-4 py-2 text-white rounded-sm hover:bg-accent-lighter"
                  >
                    Home
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex flex-col w-full mb-8 flex-grow mx-auto xl:max-w-screen-xl px-6">
          <Component {...pageProps} />
        </main>
        <footer className="flex items-center justify-center w-full h-24 border-t">
          The Split Screen Van Club 1983 - 2021
        </footer>
      </div>
    </>
  );
}