function Block({ children }) {
  return (
    <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
      <div className="grid gap-4 p-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
        {children}
      </div>
    </div>
  );
}

export default Block;
