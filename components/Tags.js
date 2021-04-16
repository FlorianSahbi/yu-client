import Link from "next/link";
import { useQuery } from "@apollo/client";
import GET_TAGS from "../graphql/tags/getTags";

function Tag({
  id, name, cover,
}) {
  return (
    <Link href={`/tags/${id}`}>
      <div className="relative cursor-pointer">
        <img
          src={cover}
          alt="me"
          className="w-full h-full object-cover object-center"
        />
        <div className="truncate w-32 absolute bottom-0 right-0 mb-1 mr-1 sm:mb-4 sm:mr-4">
          <p className="pl-4 pr-2 via-blue-500 from-blue-500 bg-gradient-to-l capitalize text-white text-right text-xs">
            Tag
          </p>
          <p className="truncate text-xs pl-4 pr-2 via-black from-black bg-gradient-to-l capitalize text-white text-right sm:text-lg">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}

function Tags() {
  const { data, loading, error } = useQuery(GET_TAGS);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <p className="text-white">Loading...</p>}
      {data?.tags?.docs.map(({
        _id, name, cover,
      }) => (
        <Tag
          id={_id}
          name={name}
          cover={cover}
        />
      ))}
    </div>
  );
}

export default Tags;
