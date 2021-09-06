import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Layout from "../../../layout/Layout";
import TRACK_FOR_UPDATE from "../../../graphql/tracks/trackForUpdate";
import EDIT_TRACK from "../../../graphql/tracks/editTrack";
import TrackField from "../../../components/display/OneTrack";
import Title from "../../../components/Title";

function EditTrack() {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      trackInput: {
        title: "", thumbnail: "", videoId: "", answers: [],
      },
    },
  });

  useQuery(TRACK_FOR_UPDATE, {
    fetchPolicy: "network-only",
    variables: { id },
    onCompleted: (data) => {
      if (data.track) {
        const {
          thumbnail, title, videoId, answers,
        } = data.track;

        const track = {
          thumbnail, title, videoId, answers: answers.map((a) => ({ answer: a })),
        };

        methods.setValue("trackInput.title", track.title);
        methods.setValue("trackInput.thumbnail", track.thumbnail);
        methods.setValue("trackInput.videoId", track.videoId);
        methods.setValue("trackInput.answers", track.answers);
      }
    },
    onError: (error) => {
      enqueueSnackbar(`Something went wrong : ${error}`, {
        variant: "error",
      });
    },
  });

  const [editTrack, { loading }] = useMutation(EDIT_TRACK, {
    onCompleted: (data) => {
      enqueueSnackbar(`"${data.updateTrack.title}" has been successfully updated`, {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(`Something went wrong : ${error}`, {
        variant: "error",
      });
    },
  });

  function format(data) {
    return { ...data.trackInput, answers: data.trackInput.answers.map(({ answer }) => answer) };
  }

  const onSubmit = (data) => editTrack({ variables: { id, trackInput: format(data) } });

  return (
    <Layout>
      <FormProvider {...methods}>
        <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
          <div className="row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center">
            <Title title="Edit a track" />
          </div>

          <div className="row-start-2 row-end-3 col-start-1 col-end-13">
            <TrackField />
            <form
              className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <input
                type="submit"
                className={loading ? "opacity-50 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9" : "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9"}
                value={loading ? "Processing..." : "Update"}
                disabled={loading}
              />
            </form>
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
}

export default EditTrack;
