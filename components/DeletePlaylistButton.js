import { useMutation } from '@apollo/client';
import { XIcon } from '@heroicons/react/solid';
import DELETE_PLAYLIST from "../graphql/playlists/deletePlaylist";

function DeletePlaylistButton({ id }) {
  const [deletePlaylist] = useMutation(DELETE_PLAYLIST, {
    onCompleted: _ => console.log("1"),
    onError: _ => console.log("0")
  });

  return (
    <XIcon
      onClick={() => deletePlaylist({ variables: { id } })}
      className="text-red-600 absolute right-0 h-6 w-6 cursor-pointer"
    />
  )
}

export default DeletePlaylistButton;
