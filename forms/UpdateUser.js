import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import GET_USER from "../graphql/users/getUser";
import UPDATE_USER from "../graphql/users/updateUser";

function UpdateUser({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useQuery(GET_USER, { variables: { id } });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id,
      username: data?.user?.username,
      avatar: data?.user?.avatar,
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (formData) => updateUser({ variables: { data: formData } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-white text-xs mb-1 opacity-70">Nom d'utilisateur</p>
        <input
          placeholder="Username"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue={data?.user?.username}
          {...register("username", { required: true })}
        />
        <p className="text-white text-xs mb-1 opacity-70">Avatar</p>
        <input
          placeholder="Avatar"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue={data?.user?.avatar}
          {...register("avatar", { required: true })}
        />
        <input type="submit" className="text-white w-full mb-4 rounded bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default UpdateUser;
