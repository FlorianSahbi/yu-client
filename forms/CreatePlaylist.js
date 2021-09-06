/* eslint-disable no-param-reassign */
import { Fragment } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import DISCORD_ID from "../graphql/local/discordId";
import AddTrack from "../components/AddTrack";
import Title from "../components/Title";
import CREATE_CUSTOM_PLAYLIST from "../graphql/tags/createCustomPlaylist";

function CreatePlaylist() {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      bulk: { youtubeLinks: [], input: "" },
      tagInput: { name: "", thumbnail: "" },
      trackInputs: [{
        answers: [{ answer: "" }], title: "", youtubeLink: "https://www.youtube.com/watch?v=6LyyLYxdpUQ",
      }],
    },
  });

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
      methods.reset({ tagInput: { name: "", thumbnail: "" }, trackInputs: [{ answers: [""], title: "" }] });
    },
    onError: (error) => {
      enqueueSnackbar(`Something went wrong : ${error}`, {
        variant: "error",
      });
    },
  });

  function format(data) {
    delete data.bulk;
    const trackInputs = data.trackInputs.map(({
      answers, category, keywords, lengthSeconds, ownerChannelName, thumbnail, title, videoId, videoUrl, _id, isNew,
    }) => ({
      answers: answers.map((item) => item.answer), category, creator: data.tagInput.creator, keywords, lengthSeconds, ownerChannelName, thumbnail, title, videoId, videoUrl, _id, isNew,
    }));
    return { ...data, trackInputs };
  }

  const onSubmit = (data) => createPlaylist({ variables: format(data) });

  const handleBulk = () => {
    const links = methods.getValues("bulk.input");
    const ArrOfLinks = links.split(",");
    methods.setValue("bulk.youtubeLinks", ArrOfLinks);
    const newState = ArrOfLinks.map((l) => (
      { answers: [{ answer: "" }], title: "", youtubeLink: l }
    ));
    methods.setValue("trackInputs", newState, { shouldValidate: true });
  };

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

        <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500 p-3 space-y-3">
          <input
            type="button"
            className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer rounded-lg h-9 w-full"
            value={`Add one track ( ${methods.getValues("trackInputs").length} )`}
            onClick={() => append({ answers: [{ answer: "" }], title: "", youtubeLink: "" })}
          />
          <input
            type="text"
            className="w-full border-pink-500 border rounded-lg p-2 outline-none"
            {...methods.register("bulk.input")}
          />
          <input
            type="button"
            className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer rounded-lg h-9 w-full"
            value="Add many tracks"
            onClick={handleBulk}
          />
        </div>

        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex">
              <Title title={`Track #${index + 1}`} />
              {fields.length > 1 && (
                <h3 className="capitalize text-lg text-lef ml-1 cursor-pointer text-red-300" onClick={() => remove(index)} aria-hidden="true">- Remove</h3>
              )}
            </div>
            <AddTrack field={field} index={index} />
          </Fragment>
        ))}

        <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
          <form
            className="p-3 flex space-x-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <input
              type="submit"
              className={methods.formState.isValid === false ? "opacity-50 bg-red-500 hover:bg-red-600 text-white cursor-pointer w-full rounded-lg h-9" : "bg-green-500 hover:bg-green-600 text-white cursor-pointer w-full rounded-lg h-9"}
              value="Done"
            />
          </form>
        </div>
      </div>
    </FormProvider>
  );
}

export default CreatePlaylist;
