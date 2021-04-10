import { useForm, useFieldArray } from "react-hook-form";
import { gql, useMutation, useQuery } from '@apollo/client';
import SelectSongInput from "../components/SelectSongInput";

const UPDATE_PLAYLIST = gql`
  mutation UpdatePlaylist($id: ID, $name: String, $thumbnail: String, $songs: [ID]) {
    updatePlaylist(id: $id, name: $name, thumbnail: $thumbnail, songs: $songs) {
      _id
      name
      thumbnail
      songs {
        _id
        title
        cover
        url
      }
    }
  }
`;

const QUERY = gql`
  query Playlist($id: ID) {
    playlist(id: $id) {
      _id
      name
      thumbnail
      songs {
        _id
        title
        cover
        url
      }
    }
  }
`;

function UpdatePlaylist({ id }) {
  const { data, loading, error } = useQuery(QUERY, { variables: { id } });

  // console.log(data)
  console.log(data?.playlist?.songs.reduce((acc, val) => [...acc, { id: val._id }], []))
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      id,
      name: data?.playlist?.name,
      thumbnail: data?.playlist?.thumbnail,
      songs: data?.playlist?.songs.reduce((acc, val) => [...acc, { id: val._id }], []),
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
        id,
        name: data.name,
        thumbnail: data.thumbnail,
        songs: data.songs.reduce((acc, val) => [...acc, val.id], []),
      }
    )
  }

  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST);


  const onSubmit = (data) => updatePlaylist({ variables: formatData(data) });

  return (
    <div className="p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {errors?.title && <p className="text-red-600 text-base mb-1">"Need a title"</p>}
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("name", { required: true })}
        />
        {errors?.url && <p className="text-red-600 text-base mb-1">"Need an URL"</p>}
        <input
          placeholder="Thumbnail"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("thumbnail", { required: true })}
        />
        {fields.map((field, index) => {
          console.log(field.id)
          return (
            <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
              <SelectSongInput
                index={index}
                placeholder="Musique"
                defaultValue={field.id}
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

export default UpdatePlaylist;
