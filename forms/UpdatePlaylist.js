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
  const { data } = useQuery(QUERY, { variables: { id } });

  const { register, handleSubmit, control } = useForm({
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

  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST, {
    onCompleted: _ => window.location.reload(),
  });

  const onSubmit = (data) => updatePlaylist({ variables: formatData(data) });

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white text-xs mb-1 opacity-70">Nom</p>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("name", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Lien photo de couverture</p>
        <input
          placeholder="Thumbnail"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("thumbnail", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Musiques</p>
        {fields.map((field, index) => {
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
