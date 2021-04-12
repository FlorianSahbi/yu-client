import { useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import { useSnackbar } from "notistack";
import DELETE_PLAYLIST from "../graphql/playlists/deletePlaylist";

function DeletePlaylistButton({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const [deletePlaylist] = useMutation(DELETE_PLAYLIST, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  return (
    <XIcon
      onClick={() => deletePlaylist({ variables: { id } })}
      className="text-red-600 absolute right-0 h-6 w-6 cursor-pointer"
    />
  );
}

export default DeletePlaylistButton;
