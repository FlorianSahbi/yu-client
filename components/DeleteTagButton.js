/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import Button from "./Button";
import DELETE_TAG from "../graphql/tags/deleteTag";

function DeleteTagButton({ id }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteTag] = useMutation(DELETE_TAG, {
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

  return (
    <Button
      onClick={() => deleteTag({ variables: { id } })}
      className="text-red-600 top-0 absolute right-0 h-6 w-6 cursor-pointer"
      value="Delete"
    />
  );
}

export default DeleteTagButton;
