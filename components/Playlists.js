import Link from 'next/link';
import DeletePlaylistButton from "./DeletePlaylistButton";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Playlists {
    playlists {
      _id
      name
      thumbnail
    }
  }
`;

function Playlist({ id, thumbnail, name, cpt, song }) {
  return (
    <div className="text-white">
      <div className="relative w-100 h-100 rounded overflow-hidden bg-gray-600">
        <DeletePlaylistButton id={id} />
        <img src={thumbnail} alt="me" className="w-full h-60 object-cover" />
        <div className="p-2">
          <Link href={`/playlist/${id}`}>
            <p>{name}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Playlists() {
  const { data, loading, error } = useQuery(QUERY);

  return (
    <main className="grid-cols-3 grid gap-4 p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <p className="text-white">Loading...</p>}
      {data?.playlists.map(p => <Playlist id={p._id} name={p.name} thumbnail={p.thumbnail} />)}
    </main>
  )
}

export default Playlists;
