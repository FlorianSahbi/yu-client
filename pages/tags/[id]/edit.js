import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Layout from "../../../layout/Layout";
import TAG from "../../../graphql/tags/tag";
import EDIT_TAG from "../../../graphql/tags/editTag";
import TrackField from "../../../components/display/OneTrack";
import Title from "../../../components/Title";

function EditTag() {
  const router = useRouter();
  const { id } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      tagInput: {
        name: "", thumbnail: "",
      },
    },
  });

  useQuery(TAG, {
    fetchPolicy: "network-only",
    variables: { id },
    onCompleted: (data) => {
      if (data.tag) {
        const {
          name, thumbnail,
        } = data.tag;

        const tag = {
          name, thumbnail,
        };

        methods.setValue("tagInput.name", tag.name);
        methods.setValue("tagInput.thumbnail", tag.thumbnail);
      }
    },
    onError: (error) => {
      enqueueSnackbar(`Something went wrong : ${error}`, {
        variant: "error",
      });
    },
  });

  const [editTag, { loading }] = useMutation(EDIT_TAG, {
    onCompleted: (data) => {
      enqueueSnackbar(`"${data.updateTag.name}" has been successfully updated`, {
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
    return { ...data.tagInput };
  }

  const onSubmit = (data) => editTag({ variables: { id, tagInput: format(data) } });

  return (
    <Layout>
      <FormProvider {...methods}>
        <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
          <div className="row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center">
            <Title title="Edit a track" />
          </div>

          <div className="row-start-2 row-end-3 col-start-1 col-end-13">
            {/* <TrackField /> */}
            <form
              className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              {methods.formState.errors?.name && <p className="text-red-600 text-base mb-1">"Need a name"</p>}
              <p className="text-white text-xs mb-1 opacity-70">Name</p>
              <input
                placeholder="Name"
                className="border-2 border-pink-500 p-1 rounded-lg mb-4 outline-none"
                {...methods.register("tagInput.name", { required: true })}
              />

              {methods.formState.errors?.thumbnail && <p className="text-red-600 text-base mb-1">"Need an thumbnail"</p>}
              <p className="text-white text-xs mb-1 opacity-70">Thumbnail</p>
              <input
                placeholder="Thumbnail"
                className="border-2 border-pink-500 p-1 rounded-lg mb-4 outline-none"
                {...methods.register("tagInput.thumbnail", { required: true })}
              />
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

export default EditTag;
