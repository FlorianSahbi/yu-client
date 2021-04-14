import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import ADD_TAG from "../graphql/tags/addTag";

function AddUser() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm({
    defaultValues: {
      name: "",
      cover: "",
    },
  });

  const [addTag] = useMutation(ADD_TAG, {
    onCompleted: () => {
      reset();
      enqueueSnackbar("Good", {
        variant: "success",
      });
    },
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (data) => addTag({ variables: { ...data } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {errors?.name && <p className="text-red-600 text-base mb-1">"Need a label"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Nom</p>
        <input
          placeholder="Name"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("name", { required: true })}
        />
        {errors?.name && <p className="text-red-600 text-base mb-1">"Need a cover"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Cover</p>
        <input
          placeholder="Cover"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("cover", { required: true })}
        />
        <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default AddUser;
