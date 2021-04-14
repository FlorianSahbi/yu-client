import { useForm, useFieldArray } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import SelectUserInput from "../components/SelectUserInput";
import SelectTagInput from "../components/SelectTagInput";
import ADD_SONG from "../graphql/songs/addSong";

function AddSong() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register, handleSubmit, control, formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      url: "",
      cover: "",
      user: "",
      correctWords: ["bf", "bgf"],
      tags: ["607645c537f1ab002284970b"],
    },
  });

  const { fields, append } = useFieldArray(
    {
      control,
      name: "correctWords",
    },
  );

  const { fields: fT, append: aT } = useFieldArray(
    {
      control,
      name: "tags",
    },
  );

  const [addSongMutation] = useMutation(ADD_SONG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
    update(cache, { data: { addSong } }) {
      cache.modify({
        fields: {
          songs(existingSongs = []) {
            const newSongRef = cache.writeFragment({
              data: addSong,
              fragment: gql`
                fragment NewSong on Song {
                  _id
                  title
                  cover
                  url
                }
              `,
            });
            return [...existingSongs, newSongRef];
          },
        },
      });
    },
  });

  const onSubmit = (data) => addSongMutation({ variables: { ...data } });

  return (
    <div className="bg-hero-endless-clouds bg-gray-900">

      <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700  rounded-lg border-b-4 border-pink-500">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          {errors?.title && <p className="text-red-600 text-base mb-1">"Need a title"</p>}
          <p className="text-white text-xs mb-1 opacity-70">Titre</p>
          <input
            placeholder="Title"
            className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            defaultValue=""
            {...register("title", { required: true })}
          />
          {errors?.url && <p className="text-red-600 text-base mb-1">"Need an URL"</p>}
          <p className="text-white text-xs mb-1 opacity-70">Lien YouTube</p>
          <input
            placeholder="Url"
            className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            defaultValue=""
            {...register("url", { required: true })}
          />
          {errors?.cover && <p className="text-red-600 text-base mb-1">"Need a cover"</p>}
          <p className="text-white text-xs mb-1 opacity-70">Couverture</p>
          <input
            placeholder="Cover"
            className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            defaultValue=""
            {...register("cover", { required: true })}
          />
          <p className="text-white text-xs mb-1 opacity-70">Tu es ?</p>
          <SelectUserInput
            placeholder="User"
            defaultValue=""
            register={register}
          />
          <p className="text-white text-xs mb-1 opacity-70">Réponses acceptées</p>
          {fields.map((field, index) => (
            <input
              key={field.id}
              {...register(`correctWords.${index}`)}
              defaultValue={field}
              placeholder={`Word ${index}`}
              className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            />
            // <input type="button" value="Supprimer" className="rounded-lg text-white h-9 bg-pink-500" onClick={() => remove(index)} />
          ))}
          {fT.map((field, index) => (
            <SelectTagInput
              key={field.id}
              index={index}
              placeholder={`Tag ${index}`}
              defaultValue={field}
              register={register}
            />
            //  <input type="button" value="Supprimer" className="rounded-lg text-white h-9 bg-pink-500" onClick={() => remove(index)} />
          ))}
          <section>
            <button
              className="text-white w-full rounded-lg bg-pink-500 mb-4  h-9"
              type="button"
              onClick={() => {
                append("OK");
              }}
            >
              Ajouter une réponse
            </button>
            <button
              className="text-white w-full rounded-lg bg-pink-500 mb-4  h-9"
              type="button"
              onClick={() => {
                aT("607645c537f1ab002284970b");
              }}
            >
              Ajouter un tag
            </button>
          </section>
          <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
        </form>
      </div>
    </div>

  );
}

export default AddSong;
