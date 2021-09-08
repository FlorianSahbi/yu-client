import Link from "next/link";
import DiscordLoginButton from "./DiscordLoginButton";

function NavButton({ label, href, disabled }) {
  if (disabled) {
    return (
      <Link href="/#">
        <div className="mr-2 text-gray-300 opacity-40 cursor-default px-3 py-2 rounded-lg text-sm font-medium">
          {label}
        </div>
      </Link>
    );
  }
  return (
    <Link href={href}>
      <div className="mr-2 cursor-pointer transition-all  text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-lg text-sm font-medium">
        {label}
      </div>
    </Link>

  );
}

function Nav() {
  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto border-b-4 border-pink-500">
        <div className="relative flex items-center justify-between h-16">

          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block w-full">
              <div className="flex justify-between w-full">
                <div className="flex">
                  <NavButton label="home" href="/" />
                  <NavButton label="tracks" href="/tracks" />
                  <NavButton label="tags" href="/tags" />
                  <NavButton label="users" href="/users" />
                  <NavButton label="create a playlist" href="/playlists/create" />
                </div>
                <DiscordLoginButton />
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BURGER MENU */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <NavButton label="home" href="/" />
            <NavButton label="tracks" href="/tracks" />
            <NavButton label="track add" href="/tracks/create" />
            <NavButton label="tags" href="/tags" />
            <NavButton label="tag add" href="/tags/create" />
            <NavButton label="users" href="/users" />
            <NavButton label="user add" href="/users/create" /> */}
            <NavButton label="create a playlist" href="/playlists/create" />
            <DiscordLoginButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
