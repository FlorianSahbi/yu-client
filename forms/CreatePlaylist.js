import { useEffect, Fragment } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import DISCORD_ID from "../graphql/local/discordId";
import AddTrack from "../components/AddTrack";
import Title from "../components/Title";
import CREATE_CUSTOM_PLAYLIST from "../graphql/tags/createCustomPlaylist";

function CreatePlaylist() {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({ mode: "onChange", defaultValues: { tagInput: { name: "1", thumbnail: "2" }, trackInputs: [undefined] } });

  const { fields, append, remove } = useFieldArray({ control: methods.control, name: "trackInputs" });

  useQuery(DISCORD_ID, {
    fetchPolicy: "network-only",
    onCompleted: ({ currentUserId }) => {
      methods.setValue("tagInput.creator", currentUserId);
    },
  });

  const [createPlaylist] = useMutation(CREATE_CUSTOM_PLAYLIST, {
    onCompleted: (data) => {
      enqueueSnackbar(`Your playlist "${data.createCustomPlaylist.name}" has been successfully created`, {
        variant: "success",
      });
    },
    onError: (error) => {
      enqueueSnackbar(`Something went wrong : ${error}`, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => console.log(value, name, type));
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  function format(data) {
    const trackInputs = data.trackInputs.map(({
      answers, category, keywords, lengthSeconds, ownerChannelName, thumbnail, title, videoId, videoUrl, _id, isNew,
    }) => ({
      answers, category, creator: data.tagInput.creator, keywords, lengthSeconds, ownerChannelName, thumbnail, title, videoId, videoUrl, _id, isNew,
    }));
    return { ...data, trackInputs };
  }

  const onSubmit = (data) => createPlaylist({ variables: format(data) });

  return (
    <FormProvider {...methods}>
      <div className="space-y-5">
        <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
          <form className="p-3 space-y-3">
            <div className="space-y-1">
              <p className="text-white text-xs opacity-70 ml-1">Name</p>
              <input
                className="w-full border-pink-500 border rounded-lg p-2 outline-none"
                placeholder="Name your playlist"
                {...methods.register("tagInput.name", { required: true })}
              />
              {methods.formState.errors.tagInput?.name && <p className="text-red-500 text-xs ml-1">A name is required</p>}
            </div>
            <div className="space-y-1">
              <p className="text-white text-xs opacity-70 ml-1">Thumbnail</p>
              <input
                className="w-full border-pink-500 border rounded-lg p-2 outline-none"
                placeholder="Pick a thumbnail for your playlist"
                {...methods.register("tagInput.thumbnail", { required: true })}
              />
              {methods.formState.errors.tagInput?.thumbnail && <p className="text-red-500 text-xs ml-1">A thumbnail is required</p>}
            </div>
          </form>
        </div>

        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex">
              <Title title={`Track #${index + 1}`} />
              {fields.length > 1 && (
                <h3 className="capitalize text-lg text-lef ml-1 cursor-pointer text-red-300" onClick={() => remove(index)} aria-hidden="true">- Remove</h3>
              )}
            </div>
            <AddTrack index={index} />
          </Fragment>
        ))}

        <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
          <form
            className="p-3 flex space-x-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <input
              type="button"
              className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9"
              value="Add track"
              onClick={() => append(undefined)}
            />
            <input
              type="submit"
              className={methods.formState.isValid === false ? "opacity-50 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9" : "bg-green-500 hover:bg-green-600 text-white cursor-pointer w-full rounded-lg h-9"}
              value="Done"
            />
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

export default CreatePlaylist;
