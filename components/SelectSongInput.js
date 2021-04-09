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
  const { data, loading, error } = useQuery(QUERY);

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <select
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="border-2 border-pink-500 p-1 rounded"
      {...register(`songs.${index}.id`)}
    >
      <option value="" disabled>Selectionner une musique</option>
      {data?.songs.map(s => <option value={s._id}>{s.title}</option>)}
    </select>
  )
}

export default SelectSongInput;
