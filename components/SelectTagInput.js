import { useQuery } from "@apollo/client";
import GET_TAGS from "../graphql/tags/getTags";

function SelectSongInput({
  placeholder, defaultValue, register, index,
}) {
  const { data, loading, error } = useQuery(GET_TAGS);

  if (error) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  return (
    <select
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="border-2 border-pink-500 p-1 rounded-lg"
      {...register(`tags.${index}`)}
    >
      <option value="" disabled>Selectionner un tag</option>
      {data?.tags?.map((s) => <option key={`option_tag_${s.name}_${s._id}`} value={s._id}>{s.name}</option>)}
    </select>
  );
}

export default SelectSongInput;
