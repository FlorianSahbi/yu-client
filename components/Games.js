import Link from "next/link";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import GET_GAMES from "../graphql/games/getGames";
import DeleteGameButton from "./DeleteGameButton";

export function Game({ id, tags, createdAt }) {
  return (
    <>
      <div className="relative">
        <DeleteGameButton id={id} />
        <Link href={`/games/${id}`}>
          <div className="relative cursor-pointer">
            <img
              src="http://www.lyon-ortho-clinic.com/files/cto_layout/img/placeholder/book.jpg"
              alt="me"
              className="w-full h-full object-cover object-center"
            />
            <div className="truncate w-32 absolute bottom-0 right-0 mb-1 mr-1 sm:mb-4 sm:mr-4">
              <p className="pl-4 pr-2 via-yellow-500 from-yellow-500 bg-gradient-to-l capitalize text-white text-right text-xs">
                {`Game : ${format(createdAt, "HH:mm:ss")}`}
              </p>
              <p className="truncate text-xs pl-4 pr-2 via-black from-black bg-gradient-to-l capitalize text-white text-right sm:text-lg">
                {tags}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

function Games() {
  const { data, loading, error } = useQuery(GET_GAMES);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.games.map(({
        _id, tags, createdAt,
      }) => (
        <Game
          id={_id}
          tags={tags[0]?.name || "not"}
          createdAt={createdAt}
        />
      ))}
    </div>
  );
}

export default Games;
