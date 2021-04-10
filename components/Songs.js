import Link from 'next/link';
import { useQuery, gql } from "@apollo/client";
import DeleteSongButton from './DeleteSongButton';

const QUERY = gql`
  query Songs {
    songs {
      _id
      title
      cover
      url
    }
  }
`;

export function Song({ id, title, url, cover, played }) {
  return (
    <div className="text-white">
      <div className="h-52 flex items-center relative w-100 h-100 rounded overflow-hidden bg-gray-600">
        <DeleteSongButton id={id} />
        <img src={cover} alt="me" className="w-full h-60 object-cover" />
      </div>
      <Link href={`/song/${id}`}>
        <p className=" truncate">{title}</p>
      </Link>
    </div>
  )
}

function Songs() {
  const { data, loading, error } = useQuery(QUERY);

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid gap-4 p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.songs.map(p => <Song id={p._id} cover={p.cover} title={p.title} url={p.url} played={p.played} />)}
    </main>
  )
}

export default Songs;
