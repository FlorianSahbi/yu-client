function Header({ title }) {
  return (
    <header className=" bg-hero-endless-clouds max-w-7xl mx-auto flex bg-gray-700 flex-col items-center py-10 rounded-t-lg border-b-4 border-pink-500">
      <div className="rounded-full overflow-hidden h-60 w-60 sm:h-96 sm:w-96 mb-2 border-2 border-white p-2">
        <img
          src="/yu.png"
          alt="me"
          className="rounded-full transform rotate-0 hover:rotate-12 transition-all"
        />
      </div>
      <h1 className="text-2xl text-white uppercase">
        {title}
      </h1>
    </header>
  );
}

export default Header;
