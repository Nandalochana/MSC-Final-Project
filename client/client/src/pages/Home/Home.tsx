import { FC } from 'react'
import { Link } from 'react-router'

export const Home: FC = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/')" }}>
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 text-center text-white px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Freelance</h1>
      <p className="text-lg md:text-xl mb-6">
        Discover our services tailored just for you.
      </p>
      <Link to="/#services">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-3xl text-lg font-semibold hover:bg-blue-600 transition duration-300">
          Explore Now
        </button>
      </Link>
    </div>
  </section>
  )
}