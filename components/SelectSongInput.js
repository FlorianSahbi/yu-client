import { useQuery } from "@apollo/client";
import GET_SONG from "../graphql/songs/getSong";
import WaitingScreen from "../components/WaitingScreen";

function SelectSongInput({ placeholder, defaultValue, register, index }) {
  const { data, loading, error } = useQuery(GET_SONG);

  if (error) {
    console.error(error);
    return null;
  }

  if (loading) return <p>Loading...</p>
  console.log(data)
  return (
    <select
      placeholder={placeholder}
      defaultValue="606f5ac5999a89621308d1ef"
      className="border-2 border-pink-500 p-1 rounded"
      {...register(`songs.${index}.id`)}
    >
      <option value="">Selectionner une musique</option>
      {/* {data?.songs.map(s => <option key={`option_song_${s.title}_${s._id}`} value={s._id}>{s.title}</option>)} */}
    </select>
  )
}

export default SelectSongInput;
