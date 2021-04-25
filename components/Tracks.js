import Link from "next/link";
import { useQuery } from "@apollo/client";
import TRACKS from "../graphql/tracks/tracks";

export function Track({ id, title, thumbnail }) {
  return (
    <Link href={`/tracks/${id}`}>
      <div className="relative cursor-pointer h-64">
        <img
          src={thumbnail}
          alt="me"
          className="w-full h-full object-cover object-center"
        />
        <div className="truncate w-32 absolute bottom-0 right-0 mb-1 mr-1 sm:mb-1 sm:mr-1">
          <p className="pl-4 pr-2 via-pink-500 from-pink-500 bg-gradient-to-l capitalize text-white text-right text-xs">
            Musique
          </p>
          <p className="truncate text-xs pl-4 pr-2 via-black from-black bg-gradient-to-l capitalize text-white text-right sm:text-lg">
            {title}
          </p>
          {" "}

        </div>
      </div>
    </Link>
  );
}

function Tracks({ pending }) {
  const { data, loading, error } = useQuery(TRACKS);

  const filter = pending ? (song) => (!song.isAccepted) : (song) => (song.isAccepted);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.tracks.filter(filter).map(({
        _id, thumbnail, title, url, played,
      }) => (
        <Track
          id={_id}
          thumbnail={thumbnail}
          title={title}
          url={url}
          played={played}
        />
      ))}
    </div>
  );
}

export default Tracks;
