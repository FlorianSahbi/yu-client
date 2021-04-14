/* eslint-disable no-underscore-dangle */
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import SelectUserInput from "../components/SelectUserInput";
import GET_SONG from "../graphql/songs/getSong";
import SelectTagInput from "../components/SelectTagInput";
import UPDATE_SONG from "../graphql/songs/updateSong";

function UpdateSong({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_SONG, { variables: { id } });

  const {
    register, handleSubmit, control,
  } = useForm({
    defaultValues: {
      id,
      title: data?.song?.title,
      url: data?.song?.url,
      cover: data?.song?.cover,
      user: data?.song?.user?._id,
      correctWords: data?.song?.correctWords,
      tags: data?.song?.tags.reduce((acc, val) => [...acc, val._id], []),
    },
  });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "correctWords",
    },
  );

  const { fields: fT, append: aT, remove: rT } = useFieldArray(
    {
      control,
      name: "tags",
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

  const onSubmit = (formData) => updateSong({ variables: { ...formData } });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  if (data) {
    return (
      <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-white text-xs mb-1 opacity-70">Titre</p>
          <input
            placeholder="Title"
            className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            defaultValue={data?.song?.title}
            {...register("title", { required: true })}
          />
          <p className="text-white text-xs mb-1 opacity-70">Lien YouTube</p>
          <input
            placeholder="Url"
            className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            defaultValue={data?.song?.url}
            {...register("url", { required: true })}
          />
          <p className="text-white text-xs mb-1 opacity-70">Couverture</p>
          <input
            placeholder="Cover"
            className="border-2 border-pink-500 p-1 rounded-lg mb-4"
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
            <div
              key={field.id}
              className="grid grid-cols-12 gap-4 mb-4"
            >
              <input
                {...register(`correctWords.${index}`)}
                defaultValue={field}
                placeholder={`Word ${index + 1}`}
                className="border-2 border-pink-500 p-1 rounded-lg row-start-1 row-end-2 col-start-1 col-end-5"
              />
              <input
                type="button"
                value="Supprimer"
                className="ounded-lg text-white h-9 rounded-lg bg-pink-500 row-start-1 row-end-2 col-start-5 col-end-7 min-w-min"
                onClick={() => remove(index)}
              />
            </div>
          ))}
          <p className="text-white text-xs mb-1 opacity-70">Tags</p>
          {fT.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-12 gap-4 mb-4"
            >
              <SelectTagInput
                className="border-2 border-pink-500 p-1 rounded-lg row-start-1 row-end-2 col-start-1 col-end-5"
                index={index}
                placeholder={`Tag ${index}`}
                defaultValue={field}
                register={register}
              />
              <input
                type="button"
                value="Supprimer"
                className="ounded-lg text-white h-9 rounded-lg bg-pink-500 row-start-1 row-end-2 col-start-5 col-end-7 min-w-min"
                onClick={() => rT(index)}
              />
            </div>
          ))}
          <section className="grid grid-cols-2 gap-4 mb-4 mt-8">
            <button
              className="text-white w-full rounded-lg bg-pink-500 h-9"
              type="button"
              onClick={() => {
                append("");
              }}
            >
              Ajouter une réponse
            </button>
            <button
              className="text-white w-full rounded-lg bg-pink-500 h-9"
              type="button"
              onClick={() => {
                aT("");
              }}
            >
              Ajouter un tag
            </button>
          </section>
          <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
        </form>
      </div>
    );
  }
}

export default UpdateSong;
