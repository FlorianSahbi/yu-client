import Link from 'next/link';
import { useQuery } from "@apollo/client";
import GET_SONGS from "../graphql/songs/getSongs";

function Song({ id, title, cover }) {
  return (
    <Link href={`/song/${id}`}>
      <div className="text-white cursor-pointer">
        <div className="h-52 flex items-center relative w-100 h-100 rounded overflow-hidden bg-gray-600">
          <img src={cover} alt="me" className="w-full h-60 object-cover" />
        </div>
        <p className=" truncate">{title}</p>
      </div>
    </Link>
  )
}

function Songs() {
  const { data, loading, error } = useQuery(GET_SONGS);

  return (
    <main className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid gap-4 p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.songs.map(p => <Song id={p._id} cover={p.cover} title={p.title} url={p.url} played={p.played} />)}
    </main>
  )
}

export default Songs;
