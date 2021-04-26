/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState } from "react";
import ACCEPT_TRACK from "../../graphql/tracks/acceptTrack";

function AcceptTrackButton({ id, data }) {
  const router = useRouter();

  const [, setIsAccepted] = useState(data?.track?.isAccepted);
  const { enqueueSnackbar } = useSnackbar();

  const [acceptTrackMutation] = useMutation(ACCEPT_TRACK, {
    onCompleted: () => {
      enqueueSnackbar("Good", {
        variant: "success",
      });
      router.back();
    },
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });
  function handleClick() {
    acceptTrackMutation({ variables: { id } });
    setIsAccepted(true);
  }
  return (
    <div className="row-start-1 row-end-2 flex items-center justify-end space-x-4">
      {data?.track?.isAccepted
        ? (
          <div className="text-white text-xs text-center w-20 rounded-lg px-2 py-2 transition-all transform border text-pink border-pink-500">
            Accepted
          </div>
        )
        : (
          <div onClick={handleClick} className="text-white w-20 text-center text-xs bg-pink-500 rounded-lg px-2 py-2 cursor-pointer transition-all transform bg-gradient-to-b border border-pink-500 from-pink-500 to-pink-500 hover:from-pink-500 hover:to-pink-600">
            Accept
          </div>
        )}
    </div>
  );
}

export default AcceptTrackButton;
