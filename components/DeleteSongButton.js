/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";
import { useSnackbar } from "notistack";
import DELETE_TRACK from "../graphql/tracks/deleteTrack";

function DeleteSongButton({ id, label }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteSong] = useMutation(DELETE_TRACK, {
    onCompleted: () => {
      router.back();
      enqueueSnackbar("Good", {
        variant: "success",
      });
    },
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  if (!label) {
    return (
      <XIcon
        onClick={() => deleteSong({ variables: { id } })}
        className="text-red-600 top-0 absolute right-0 h-6 w-6 cursor-pointer"
      />
    );
  }
  return (
    <p onClick={() => deleteSong({ variables: { id } })}>
      {label}
    </p>
  );
}

export default DeleteSongButton;
