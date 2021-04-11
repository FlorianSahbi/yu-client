import { useForm, useFieldArray } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import SelectUserInput from "../components/SelectUserInput";
import ADD_SONG from "../graphql/songs/addSong";
import { useSnackbar } from 'notistack';

function AddSong() {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      title: "",
      url: "",
      cover: "",
      user: "",
      correctWords: [""],
    }
  });

  console.log(watch())

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "correctWords"
    }
  );

  const [addSong] = useMutation(ADD_SONG, {
    onCompleted: _ => enqueueSnackbar("Good", {
      variant: 'success',
    }),
    onError: _ => enqueueSnackbar("Bad", {
      variant: 'error',
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
              `
            });
            return [...existingSongs, newSongRef];
          }
        }
      })
    }
  });

  const onSubmit = (data) => addSong({ variables: { ...data } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {errors?.title && <p className="text-red-600 text-base mb-1">"Need a title"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Titre</p>
        <input
          placeholder="Title"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("title", { required: true })}
        />
        {errors?.url && <p className="text-red-600 text-base mb-1">"Need an URL"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Lien YouTube</p>
        <input
          placeholder="Url"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("url", { required: true })}
        />
        {errors?.cover && <p className="text-red-600 text-base mb-1">"Need a cover"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Couverture</p>
        <input
          placeholder="Cover"
          className="border-2 border-pink-500 p-1 rounded mb-4"
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
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <input
                placeholder={`Word ${index}`}
                className="border-2 border-pink-500 p-1 rounded mb-4"
                key={field.id}
                {...register(`correctWords.${index}.`)}
                defaultValue={field.value}
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
            Ajouter une réponse
          </button>
        </section>
        <input type="submit" className="text-white w-full mb-4 rounded bg-pink-500 h-9" />
      </form>
    </div>
  )
}

export default AddSong;
