import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from '@apollo/client';

const UPDATE_SONG = gql`
  mutation UpdateSong($id: ID, $title: String, $cover: String, $url: String) {
    updateSong(id: $id, title: $title, cover: $cover, url: $url) {
      _id
      title
      cover
      url
    }
  }
`;

const QUERY = gql`
  query Song($id: ID) {
    song(id: $id) {
      _id
      title
      cover
      url
    }
  }
`;

function UpdateSong({ id }) {
  const { data, loading, error } = useQuery(QUERY, { variables: { id } });
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id,
      title: data?.song?.title,
      url: data?.song?.url,
      cover: data?.song?.cover,
    }
  });

  const [updateSong] = useMutation(UPDATE_SONG);

  const onSubmit = (data) => updateSong({ variables: data });

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

export default UpdateSong;
