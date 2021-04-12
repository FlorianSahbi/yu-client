import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import SelectSongInput from "../components/SelectSongInput";
import ADD_PLAYLIST from "../graphql/playlists/addPlaylist";

function AddPlaylist() {
  const { enqueueSnackbar } = useSnackbar();
  const [addPlaylist] = useMutation(ADD_PLAYLIST, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const {
    register, control, handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      thumbnail: "",
      songs: [],
    },
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "songs",
    },
  );

  function formatData(data) {
    return (
      {
        name: data.name,
        thumbnail: data.thumbnail,
        songs: data.songs.reduce((acc, val) => [...acc, val.id], []),
      }
    );
  }

  const onSubmit = (data) => addPlaylist({ variables: formatData(data) });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white text-xs mb-1 opacity-70">Nom</p>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register(`name`)}
        />
        <p className="text-white text-xs mb-1 opacity-70">Lien photo de couverture</p>
        <input
          placeholder="Thumbnail"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register(`thumbnail`)}
        />
        <p className="text-white text-xs mb-1 opacity-70">Musiques</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
            <SelectSongInput
              key={`${field.id}`}
              index={index}
              placeholder="Musique"
              defaultValue=""
              register={register}
            />
            <input type="button" value="Supprimer" className="rounded text-white h-9 bg-pink-500" onClick={() => remove(index)} />
          </div>
        ))}
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
  );
}

export default AddPlaylist;
