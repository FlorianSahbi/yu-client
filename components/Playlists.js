import Link from 'next/link';
import { useQuery } from "@apollo/client";
import GET_PLAYLISTS from "../graphql/playlists/getPlaylists";

function Playlist({ id, thumbnail, name, songs }) {
  return (
    <Link
      href={`/playlist/${id}`}
    >
      <div
        className="text-white transition-all transform -translate-y-0 hover:-translate-y-3 cursor-pointer rounded-lg bg-gray-600"
      >
        <div
          className="relative w-100 h-100 rounded-t-lg overflow-hidden"
        >
          <img
            src={thumbnail}
            alt="me"
            className="w-full h-60 object-cover"
          />
        </div>
        <div
          className="flex justify-between p-2 truncate"
        >
          <p>
            {name}
          </p>
          <p>
            {`${songs.length} songs`}
          </p>
        </div>
      </div>
    </Link>
  )
}

function Playlists() {
  const { data, loading, error } = useQuery(GET_PLAYLISTS);

  return (
    <div
      className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-2 grid gap-4 p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500"
    >
      {error && <p>Error...</p>}
      {loading && <p className="text-white">Loading...</p>}
      {data?.playlists.map(({ _id, name, thumbnail, songs }) => (
        <Playlist
          id={_id}
          name={name}
          thumbnail={thumbnail}
          songs={songs}
        />
      ))}
    </div>
  )
}

export default Playlists;
