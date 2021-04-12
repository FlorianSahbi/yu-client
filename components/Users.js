import Link from "next/link";
import { useQuery } from "@apollo/client";
import GET_USERS from "../graphql/users/getUsers";

function User({ id, avatar, username }) {
  return (
    <Link
      href={`/user/${id}`}
    >
      <div
        className="text-white transition-all transform -translate-y-0 hover:-translate-y-3 cursor-pointer rounded-lg bg-gray-600"
      >
        <div
          className="relative w-100 h-100 rounded-lg overflow-hidden "
        >
          <img
            src={avatar}
            alt="me"
            className="w-full h-48 object-cover"
          />
        </div>
        <p
          className="p-2 truncate"
        >
          {username}
        </p>
      </div>
    </Link>
  );
}

function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  return (
    <div
      className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500"
    >
      {error && <p>Error...</p>}
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
