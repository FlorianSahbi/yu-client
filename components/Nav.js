import Link from 'next/link'

function Nav() {
  return (
    <nav className="invisible md:visible flex justify-between p-4 mx-10 text-white text-xs">
      <ul className="flex">
        <li className="mr-4">
          <Link href="/">
            accueil
          </Link>
        </li>
        <li className="mr-4">
          <Link href="/songs">
            musiques
          </Link>
        </li>
        <li className="mr-4">
          <Link href="/playlists">
            playlists
          </Link>
        </li>
        <li className="mr-4 text-gray-700">ranking (soon)</li>
        <li className="mr-4 text-gray-700">communauté (soon)</li>
        <li className="text-gray-700">langue (soon)</li>
      </ul>
      <ul className="flex">
        <li className="text-gray-700">se connecter (soon)</li>
      </ul>
    </nav>
  )
}

export default Nav;
