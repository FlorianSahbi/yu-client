/* eslint-disable no-underscore-dangle */
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import SelectUserInput from "../components/SelectUserInput";
import GET_SONG from "../graphql/songs/getSong";
import UPDATE_SONG from "../graphql/songs/updateSong";

function UpdateSong({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(GET_SONG, { variables: { id } });

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      id,
      title: data?.song?.title,
      url: data?.song?.url,
      cover: data?.song?.cover,
      user: data?.song?.user?._id,
      correctWords: data?.song?.correctWords,
    },
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "correctWords",
    },
  );

  const [updateSong] = useMutation(UPDATE_SONG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (formData) => updateSong({ variables: { data: formData } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white text-xs mb-1 opacity-70">Titre</p>
        <input
          placeholder="Title"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue={data?.song?.title}
          {...register("title", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Lien YouTube</p>
        <input
          placeholder="Url"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue={data?.song?.url}
          {...register("url", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Couverture</p>
        <input
          placeholder="Cover"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue={data?.song?.cover}
          {...register("cover", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Tu es ?</p>
        <SelectUserInput
          placeholder="User"
          defaultValue={data?.song?.user?._id}
          register={register}
        />
        <p className="text-white text-xs mb-1 opacity-70">Réponses acceptées</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4">
            <input
              placeholder={`Word ${index}`}
              className="border-2 border-pink-500 p-1 rounded mb-4"
              key={`input_word_${field.id}`}
              {...register(`correctWords.${index}`)}
              defaultValue={field.value}
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
            Ajouter une réponse
          </button>
        </section>
        <input type="submit" className="text-white w-full mb-4 rounded bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default UpdateSong;
