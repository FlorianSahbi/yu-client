import { useQuery } from "@apollo/client";
import GET_USERS from "../graphql/users/getUsers";

function SelectUserInput({ placeholder, defaultValue, register }) {
  const { data, loading, error } = useQuery(GET_USERS);

  if (error) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  return (
    <select
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="border-2 border-pink-500 p-1 rounded mb-4"
      {...register(`user`)}
    >
      <option value="" disabled>Selectionner un utilisateur</option>
      {data?.users.map((s) => <option key={`option_song_${s.username}_${s._id}`} value={s._id}>{s.username}</option>)}
    </select>
  );
}

export default SelectUserInput;
