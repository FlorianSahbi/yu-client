import { gql, useMutation } from '@apollo/client';
import { XIcon } from '@heroicons/react/solid';

const DELETE_USER = gql`
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      _id
      username
      avatar
    }
  }
`;

function DeleteUserButton({ id }) {
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: _ => console.log("1"),
    onError: _ => console.log("0")
  });

  return <XIcon onClick={() => deleteUser({ variables: { id } })} className="text-red-600 absolute right-0 h-6 w-6 cursor-pointer" />;
}

export default DeleteUserButton;
