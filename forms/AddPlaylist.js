import { useForm, useFieldArray } from "react-hook-form";
import SelectSongInput from "../components/SelectSongInput";
import { gql, useMutation } from '@apollo/client';

const ADD_PLAYLIST = gql`
  mutation AddPlaylist($name: String, $thumbnail: String, $songs: [ID]) {
    addPlaylist(name: $name, thumbnail: $thumbnail, songs: $songs) {
      _id
      name
      songs {
        _id
        title
        cover
        url
      }
    }
  }
`;

function AddPlaylist() {
  const [addPlaylist] = useMutation(ADD_PLAYLIST, {
    onCompleted: _ => console.log("1"),
    onError: _ => console.log("0")
  });

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      thumbnail: "",
      songs: [],
    }
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "songs"
    }
  );

  function formatData(data) {
    return (
      {
        name: data.name,
        thumbnail: data.thumbnail,
        songs: data.songs.reduce((acc, val) => [...acc, val.id], []),
      }
    )
  }

  const onSubmit = (data) => addPlaylist({ variables: formatData(data) });

  return (
    <div className="p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue="" // make sure to set up defaultValue
          {...register(`name`)}
        />
        <input
          placeholder="Thumbnail"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue="" // make sure to set up defaultValue
          {...register(`thumbnail`)}
        />
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
              <SelectSongInput
                key={`${field.id}`}
                index={index}
                placeholder="Musique"
                defaultValue=""
                register={register}
              />
              <input type="button" value="Supprimer" className="rounded text-white h-9 bg-pink-500" type="button" onClick={() => remove(index)} />
            </div>
          );
        })}
        <section>
          <button
            className="text-white w-full rounded bg-pink-500 mb-4  h-9"
            type="button"
            onClick={() => {
              append({ id: "" });
            }}
          >
            Ajouter une musique
          </button>
        </section>

        <input type="submit" className="text-white w-full mb-4 rounded bg-pink-500 h-9" />
      </form>
    </div>
  )
}

export default AddPlaylist;
