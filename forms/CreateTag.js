/* eslint-disable no-use-before-define */
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import CREATE_TAG from "../graphql/tags/createTag";
import DISCORD_ID from "../graphql/local/discordId";

function CreateUser() {
  const { enqueueSnackbar } = useSnackbar();

  useQuery(DISCORD_ID, {
    onCompleted: ({ currentUserId }) => {
      setValue("tagInput.creator", currentUserId);
    },
  });

  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    defaultValues: {
      tagInput: {
        name: "",
        thumbnail: "",
        creator: "",
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
