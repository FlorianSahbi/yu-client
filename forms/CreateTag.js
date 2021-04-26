import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import CREATE_TAG from "../graphql/tags/createTag";

function CreateUser() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      tagInput: {
        name: "",
        thumbnail: "",
        creator: "60850a9c7b52ff34c652afc9",
        tracks: [],
      },
    },
  });

  const [createTag] = useMutation(CREATE_TAG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (data) => createTag({ variables: { ...data } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        {errors?.name && <p className="text-red-600 text-base mb-1">"Need a name"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Name</p>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          {...register("tagInput.name", { required: true })}
        />

        {errors?.thumbnail && <p className="text-red-600 text-base mb-1">"Need an thumbnail"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Thumbnail</p>
        <input
          placeholder="Thumbnail"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          {...register("tagInput.thumbnail", { required: true })}
        />

        {errors?.discordId && <p className="text-red-600 text-base mb-1">"Need a creator"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Creator Id</p>
        <input
          placeholder="Creator Id"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          {...register("tagInput.creator", { required: true })}
        />

        <input
          type="submit"
          className="text-white w-full rounded-lg bg-pink-500 h-9"
          value="Create tag"
        />
      </form>
    </div>
  );
}

export default CreateUser;
