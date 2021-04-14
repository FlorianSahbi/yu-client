import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import GET_TAG from "../graphql/tags/getTags";
import UPDATE_TAG from "../graphql/tags/updateTag";

function UpdateUser({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(GET_TAG, { variables: { id } });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id,
      name: data?.tag?.name,
    },
  });

  const [updateTag] = useMutation(UPDATE_TAG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (formData) => updateTag({ variables: { data: formData } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white text-xs mb-1 opacity-70">Nom</p>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue={data?.tag?.name}
          {...register("name", { required: true })}
        />
        <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default UpdateUser;
