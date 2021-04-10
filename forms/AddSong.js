import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';

const ADD_SONG = gql`
  mutation AddSong($title: String, $cover: String, $url: String) {
    addSong(title: $title, cover: $cover, url: $url) {
      _id
      title
      cover
      url
    }
  }
`;

function AddSong() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "",
      url: "",
      cover: "",
    }
  });

  const [addSong] = useMutation(ADD_SONG, {
    onCompleted: _ => {
      reset();
    },
    update(cache, {data: {addSong}}) {
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
    <div className="p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {errors?.title && <p className="text-red-600 text-base mb-1">"Need a title"</p>}
        <input
          placeholder="Title"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("title", { required: true })}
        />
        {errors?.url && <p className="text-red-600 text-base mb-1">"Need an URL"</p>}
        <input
          placeholder="Url"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("url", { required: true })}
        />
        {errors?.cover && <p className="text-red-600 text-base mb-1">"Need a cover"</p>}
        <input
          placeholder="Cover"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("cover", { required: true })}
        />
        <input type="submit" className="text-white w-full mb-4 rounded bg-pink-500 h-9" />
      </form>
    </div>
  )
}

export default AddSong;
