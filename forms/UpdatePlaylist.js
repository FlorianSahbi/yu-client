import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import SelectSongInput from "../components/SelectSongInput";
import GET_PLAYLIST from "../graphql/playlists/getPlaylist";
import UPDATE_PLAYLIST from "../graphql/playlists/updatePlaylist";

function UpdatePlaylist({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(GET_PLAYLIST, { variables: { id } });

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      id,
      name: data?.playlist?.name,
      thumbnail: data?.playlist?.thumbnail,
      songs: data?.playlist?.songs.reduce((acc, val) => [...acc, { id: val._id }], []),
    },
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "songs",
    },
  );

  function formatData(dataToFormat) {
    return (
      {
        id,
        name: dataToFormat.name,
        thumbnail: dataToFormat.thumbnail,
        songs: dataToFormat.songs.reduce((acc, val) => [...acc, val.id], []),
      }
    );
  }

  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (dataForm) => updatePlaylist({ variables: formatData(dataForm) });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white text-xs mb-1 opacity-70">Nom</p>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("name", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Lien photo de couverture</p>
        <input
          placeholder="Thumbnail"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("thumbnail", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Musiques</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
            <SelectSongInput
              index={index}
              placeholder="Musique"
              defaultValue={field.id}
              register={register}
            />
            <input type="button" value="Supprimer" className="rounded-lg text-white h-9 bg-pink-500" onClick={() => remove(index)} />
          </div>
        ))}
        <section>
          <button
            className="text-white w-full rounded-lg bg-pink-500 mb-4  h-9"
            type="button"
            onClick={() => {
              append({ id: "" });
            }}
          >
            Ajouter une musique
          </button>
        </section>
        <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default UpdatePlaylist;
