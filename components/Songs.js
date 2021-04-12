import Link from 'next/link';
import { useQuery } from "@apollo/client";
import GET_SONGS from "../graphql/songs/getSongs";

function Song({ id, title, cover }) {
  return (
    <Link href={`/songs/${id}`}>
      <div className="text-white h-32 cursor-pointer rounded-lg bg-gray-600 border-pink-500 transition-all border-b-2 hover:border-b-4">
        <div className="h-full w-full rounded-lg">
          <img
            src={cover}
            alt="me"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Link>
  )
}

function Songs() {
  const { data, loading, error } = useQuery(GET_SONGS);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 grid gap-4 p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.songs.map(({ _id, cover, title, url, played }) => (
        <Song
          id={_id}
          cover={cover}
          title={title}
          url={url}
          played={played}
        />
      )
      )}
    </div>
  )
}

export default Songs;
