import Link from 'next/link';
import { useQuery } from "@apollo/client";
import GET_PLAYLISTS from "../graphql/playlists/getPlaylists";

function Playlist({ id, thumbnail, name, songs }) {
  return (
    <Link href={`/playlists/${id}`}>
      <div className="text-white h-32 cursor-pointer rounded-lg bg-gray-600 border-pink-500 transition-all border-b-2 hover:border-b-4 flex">
        <div className="h-full w-44 rounded-lg overflow-hidden">
          <img
            src={thumbnail}
            alt="me"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="justify-between p-2 truncate w-full">
          <p className="text-lg truncate">
            {name}
          </p>
          <p className="text-sm">
            By : Flo
          </p>
          <p className="text-xs">
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
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 grid gap-4 p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
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
