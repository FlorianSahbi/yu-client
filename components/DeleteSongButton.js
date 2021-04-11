import { useMutation } from '@apollo/client';
import { XIcon } from '@heroicons/react/solid';
import DELETE_SONG from "../graphql/songs/deleteSong";

function DeleteSongButton({ id }) {
  const [deleteSong] = useMutation(DELETE_SONG, {
    onCompleted: _ => console.log("1"),
    onError: _ => console.log("0")
  });

  return (
    <XIcon
      onClick={() => deleteSong({ variables: { id } })}
      className="text-red-600 top-0 absolute right-0 h-6 w-6 cursor-pointer"
    />
  )
}

export default DeleteSongButton;
