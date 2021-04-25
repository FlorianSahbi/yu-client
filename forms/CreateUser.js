import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import CREATE_USER from "../graphql/users/createUser";

function CreateUser() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      avatar: "",
      discordId: "",
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubmit = (data) => createUser({ variables: { ...data } });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        {errors?.username && <p className="text-red-600 text-base mb-1">"Need a title"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Nom d'utilisateur</p>
        <input
          placeholder="Username"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("username", { required: true })}
        />

        {errors?.username && <p className="text-red-600 text-base mb-1">"Need an Username"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Avatar</p>
        <input
          placeholder="Avatar"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("avatar", { required: true })}
        />

        {errors?.discordId && <p className="text-red-600 text-base mb-1">"Need an discord id"</p>}
        <p className="text-white text-xs mb-1 opacity-70">Discord Id</p>
        <input
          placeholder="DiscordId"
          className="border-2 border-pink-500 p-1 rounded-lg mb-4"
          defaultValue=""
          {...register("discordId", { required: true })}
        />

        <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default CreateUser;
