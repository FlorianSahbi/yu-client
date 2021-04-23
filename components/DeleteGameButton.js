import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/solid";
import { useSnackbar } from "notistack";
import DELETE_GAME from "../graphql/games/deleteGame";

function DeleteGameButton({ id, back }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteGame] = useMutation(DELETE_GAME, {
    onCompleted: () => {
      if (back) {
        router.back();
      }
      enqueueSnackbar("Good", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Bad", {
        variant: "error",
      });
    },
  });

  return (
    <XIcon
      onClick={() => deleteGame({ variables: { id } })}
      className="text-red-600 absolute z-50 right-0 h-6 w-6 cursor-pointer"
    />
  );
}

export default DeleteGameButton;
