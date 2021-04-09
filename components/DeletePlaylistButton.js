import { gql, useMutation } from '@apollo/client';
import { XIcon } from '@heroicons/react/solid';

const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($id: ID) {
    deletePlaylist(id: $id) {
      _id
    }
  }
`;

function DeletePlaylistButton({ id }) {
  const [deletePlaylist] = useMutation(DELETE_PLAYLIST, {
    onCompleted: _ => console.log("1"),
    onError: _ => console.log("0")
  });

  return <XIcon onClick={() => deletePlaylist({ variables: { id } })} className="text-red-600 absolute right-0 h-6 w-6 cursor-pointer" />;
}

export default DeletePlaylistButton;
