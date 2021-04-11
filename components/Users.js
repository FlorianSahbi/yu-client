import Link from 'next/link';
import { useQuery } from "@apollo/client";
import GET_USERS from "../graphql/users/getUsers";

function User({ id, avatar, username }) {
  return (
    <Link href={`/user/${id}`}>
      <div className="text-white cursor-pointer">
        <div className="relative w-100 h-100 rounded overflow-hidden bg-gray-600">
          <img src={avatar} alt="me" className="w-full h-48 object-cover" />
        </div>
        <p>{username}</p>
      </div>
    </Link>
  )
}

function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  return (
    <main className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 m-10 rounded-lg border-b-4 border-pink-500">
      {error && <p>Error...</p>}
      {loading && <h2 className="text-white">Loading...</h2>}
      {data?.users.map(p => <User id={p._id} avatar={p.avatar} username={p.username} />)}
    </main>
  )
}

export default Users;
