import { useQuery } from "@apollo/client";
import GET_TAGS from "../graphql/tags/getTags";

function SelectSongInput({
  placeholder, defaultValue, register, index, className,
}) {
  const { data, loading, error } = useQuery(GET_TAGS);

  if (error) {
    return null;
  }

  if (loading) return <p>Loading...</p>;

  if (data) {
    return (
      <select
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={className}
        {...register(`tags.${index}`)}
      >
        <option value="" disabled>Selectionner un tag</option>
        {data?.tags?.docs?.map((s) => <option key={`option_tag_${s.name}_${s._id}`} value={s._id}>{s.name}</option>)}
      </select>
    );
  }
}

export default SelectSongInput;
