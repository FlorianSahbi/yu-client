import Link from "next/link";
import { useQuery } from "@apollo/client";
import USERS from "../graphql/users/users";

function User({ id, avatar, username }) {
  return (
    <Link href={`/users/${id}`}>
      <div className="relative cursor-pointer">
        <img
          src={avatar}
          alt="me"
          className="w-full h-full object-cover object-center"
        />
        <div className="truncate w-32 absolute bottom-0 right-0 mb-1 mr-1 sm:mb-4 sm:mr-4">
          <p className="pl-4 pr-2 via-green-500 from-green-500 bg-gradient-to-l capitalize text-white text-right text-xs">
            User
          </p>
          <p className="truncate text-xs pl-4 pr-2 via-black from-black bg-gradient-to-l capitalize text-white text-right sm:text-lg">
            {username}
          </p>
        </div>
      </div>
    </Link>
  );
}

function Users() {
  const { data, loading, error } = useQuery(USERS);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500">
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.users.map(({ _id, avatar, username }) => (
        <User
          id={_id}
          avatar={avatar}
          username={username}
        />
      ))}
    </div>
  );
}

export default Users;
