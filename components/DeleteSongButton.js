import { useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import { useSnackbar } from "notistack";
import DELETE_SONG from "../graphql/songs/deleteSong";

function DeleteSongButton({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteSong] = useMutation(DELETE_SONG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  return (
    <XIcon
      onClick={() => deleteSong({ variables: { id } })}
      className="text-red-600 top-0 absolute right-0 h-6 w-6 cursor-pointer"
    />
  );
}

export default DeleteSongButton;
