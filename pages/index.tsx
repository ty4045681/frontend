// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
      <div className="bg-gray-100 min-h-screen">
        <Head>
          <title>Conference Management System</title>
          <meta name="description" content="A web-based conference management system" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Header */}
        <header className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="text-2xl font-bold">Conference Management System</div>
            <nav>
              <ul className="flex items-center space-x-4">
                <li>
                  <Link href="/">
                      <span className="cursor-pointer hover:text-gray-300">Home</span>
                  </Link>
                </li>
                {/* More navigation links */}
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to our Conference Management System</h1>
            <p className="text-lg mb-10">
              Discover, register, and manage your favorite conferences all in one place.
            </p>
            <Link href="/register">
              <span className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Started
              </span>
            </Link>
          </div>
        </section>

        {/* Upcoming conferences section */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Upcoming Conferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Loop through conference data */}
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Conference #{index + 1}</h3>
                    <p className="text-gray-600 mb-4">Location - Date</p>
                    <p className="text-gray-800">
                      A brief description of the conference goes here.
                    </p>
                  </div>
                  <Link href={`/conference/${index + 1}`}>
                    <span className="cursor-pointer mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Learn More
                    </span>
                  </Link>
                </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Conference Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
}
