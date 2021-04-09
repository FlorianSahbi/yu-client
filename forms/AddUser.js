import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser($username: String, $avatar: String) {
    addUser(username: $username, avatar: $avatar) {
      _id
      username
      avatar
    }
  }
`;

function AddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      avatar: "",
    }
  });

  const [addUser] = useMutation(ADD_USER);

  const onSubmit = (data) => addUser({ variables: { ...data } });

  return (
    <div className="p-4 bg-gray-700  m-10 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {errors?.username && <p className="text-red-600 text-base mb-1">"Need a title"</p>}
        <input
          placeholder="Username"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("username", { required: true })}
        />
        {errors?.username && <p className="text-red-600 text-base mb-1">"Need an Username"</p>}
        <input
          placeholder="Avatar"
          className="border-2 border-pink-500 p-1 rounded mb-4"
          defaultValue=""
          {...register("avatar", { required: true })}
        />
        <input type="submit" className="text-white w-full mb-4 rounded bg-pink-500 h-9" />
      </form>
    </div>
  )
}

export default AddUser;
