
import { useQuery, gql } from "@apollo/client";
import DeleteUserButton from "./DeleteUserButton";

const QUERY = gql`
  query Users {
    users {
      _id
      username
      avatar
    }
  }
`;

function User({ id, avatar, username }) {
  return (
    <div className="text-white">
      <div className="relative w-100 h-100 rounded overflow-hidden bg-gray-600">
        <DeleteUserButton id={id} />
        <img src={avatar} alt="me" className="w-full h-60 object-cover" />
      </div>
      <p>{username}</p>
    </div>
  )
}

function Users() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <main className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 m-10 rounded-lg border-b-4 border-pink-500">
      {data?.users.map(p => <User id={p._id} avatar={p.avatar} username={p.username} />)}
    </main>
  )
}

export default Users;
