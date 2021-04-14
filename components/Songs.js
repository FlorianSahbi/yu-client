import Link from "next/link";
import { useQuery } from "@apollo/client";
import GET_SONGS from "../graphql/songs/getSongs";

function Song({ id, title, cover }) {
  return (
    <Link href={`/songs/${id}`}>
      <div className="relative cursor-pointer">
        <img
          src={cover}
          alt="me"
          className="w-full h-full object-cover object-center"
        />
        <div className="truncate w-32 absolute bottom-0 right-0 mb-1 mr-1 sm:mb-4 sm:mr-4">
          <p className="pl-4 pr-2 via-pink-500 from-pink-500 bg-gradient-to-l capitalize text-white text-right text-xs">
            Musique
          </p>
          <p className="truncate text-xs pl-4 pr-2 via-black from-black bg-gradient-to-l capitalize text-white text-right sm:text-lg">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

function Songs({ pending }) {
  const { data, loading, error } = useQuery(GET_SONGS);

  const filter = pending ? (song) => (!song.isAccepted) : (song) => (song.isAccepted);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.songs.filter(filter).map(({
        _id, cover, title, url, played,
      }) => (
        <Song
          id={_id}
          cover={cover}
          title={title}
          url={url}
          played={played}
        />
      ))}
    </div>
  );
}

export default Songs;
