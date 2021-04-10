import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Songs {
    songs {
      _id
      cover
      title
      url
    }
  }
`;

function SelectSongInput({ placeholder, defaultValue, register, index }) {
  console.log(defaultValue)
  const { data, loading, error } = useQuery(QUERY);

  if (error) {
    console.error(error);
    return null;
  }

  if (loading) return <p>Loading...</p>
  return (
    <select
      placeholder={placeholder}
      defaultValue="606f5ac5999a89621308d1ef"
      className="border-2 border-pink-500 p-1 rounded"
      {...register(`songs.${index}.id`)}
    >
      <option value="">Selectionner une musique</option>
      {data?.songs.map(s => <option key={`option_song_${s.title}_${s._id}`} value={s._id}>{s.title}</option>)}
    </select>
  )
}

export default SelectSongInput;
