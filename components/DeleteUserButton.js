import { useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import { useSnackbar } from "notistack";
import DELETE_USER from "../graphql/users/deleteUser";

function DeleteUserButton({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  return (
    <XIcon
      onClick={() => deleteUser({ variables: { id } })}
      className="text-red-600 absolute right-0 h-6 w-6 cursor-pointer"
    />
  );
}

export default DeleteUserButton;
