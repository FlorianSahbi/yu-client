import Link from "next/link";
import { useRouter } from "next/router";
// import en from "../locales/en";
// import fr from "../locales/fr";

function Nav() {
  const router = useRouter();
  const { locale } = router;
  // const t = locale === "en" ? en : fr;

  function changeLanguage(e) {
    const selectedLocale = e.target.value;
    router.push("/", "/", { locale: selectedLocale });
  }

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

  return (
    <nav className="w-full bg-gray-900 bg-hero-endless-clouds">
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
            <div className="hidden sm:block">
              <div className="flex">
                {/* <NavButton label={t.nav.home} href="/" />
                <NavButton label={t.nav.musics} href="/songs" />
                <NavButton label={t.nav.playlists} href="/playlists" />
                <NavButton label={t.nav.community} href="/users" /> */}
                <NavButton label="accueil" href="/" />
                <NavButton label="what is Yu ?" href="/" />
                <NavButton label="themes" href="/tags" />
                <NavButton label="new submission" href="/songs/submit" />
                <NavButton label="Pending songs" href="/songs/pending" />
                <NavButton label="songs" href="/songs" />
                <div className="mr-2 cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-lg text-sm font-medium">
                  <select
                    onChange={changeLanguage}
                    defaultValue={locale}
                    className="bg-transparent outline-none"
                  >
                    <option value="fr">FR</option>
                    <option value="en">EN</option>
                  </select>
                </div>
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
                  {/* <UserCircleIcon className="h-9 w-9 text-gray-300" /> */}
                  {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                </button>
              </div>

              {/* NAV BAR MENU */}
              {/* <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <div href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</div>
              <div href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</div>
              <div href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</div>
            </div> */}
            </div>
          </div>
        </div>

        {/* BURGER MENU */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavButton label="accueil" href="/" />
            <NavButton label="what is Yu ?" href="/" />
            <NavButton label="themes" href="/tags" />
            <NavButton label="new submission" href="/songs/submit" />
            <NavButton label="Pending songs" href="/songs/pending" />
            <NavButton label="songs" href="/songs" />
            {/* <Link href="/">
              <div href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-lg text-base font-medium">
                {t.nav.home}
              </div>
            </Link>
            <Link href="/songs">
              <div href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-lg text-base font-medium">
                {t.nav.musics}
              </div>
            </Link>
            <Link href="/playlists">
              <div href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-lg text-base font-medium">
                {t.nav.playlists}
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
