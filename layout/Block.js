function Block({ children }) {
  return (
    <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
      <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </div>
  );
}

export default Block;
