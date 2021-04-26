/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useForm, useFieldArray } from "react-hook-form";
import { useLazyQuery, useMutation } from "@apollo/client";
import YouTube from "react-youtube";
import { useSnackbar } from "notistack";
import YOUTUBE_DATA from "../graphql/youtube/youtubeData";
import CREATE_CUSTOM_PLAYLIST from "../graphql/tags/createCustomPlaylist";

const NestedArray = ({
  nestIndex, control, register, watch,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `tracks.${nestIndex}.answers`,
  });

  return (
    <>
      {watch(`tracks.${nestIndex}.edit`)
        ? (
          <div className="gap-4 grid grid-cols-2">
            {fields.map((field, index) => (
              <>
                <input
                  {...register(`tracks.${nestIndex}.answers.${index}.keyword`)}
                  defaultValue={field.keyword}
                  placeholder="Answer"
                  className="w-full border-pink-500 border rounded-lg p-1"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-full bg-pink-500 text-white rounded-lg p-1"
                >
                  Delete answer
                </button>
              </>
            ))}

            <button
              type="button"
              onClick={() => append({ keyword: "" })}
              className="w-full bg-pink-500 text-white rounded-lg p-1"
            >
              Add answer
            </button>
          </div>
        )
        : (
          <div className="flex w-100 justify-evenly">
            {fields.map((field, index) => (
              <p className="text-white text-sm pl-2">
                {`Answer ${index + 1} : ${field.keyword}`}
              </p>
            ))}
          </div>
        )}
    </>
  );
};

function Fields({
  control, register, setValue, watch,
}) {
  const { fields } = useFieldArray({
    control,
    name: "tracks",
  });

  return (
    <>
      {fields.map((item, index) => (
        <div
          className="shadow-lg bg-gray-800 border-b border-pink-500 rounded-lg gap-4 p-4 grid grid-cols-2 grid-flow-row mb-4"
          key={item.id}
        >
          <div className="col-start-1 col-end-3 row-start-1 row-end-2">
            {watch(`tracks.${index}.edit`)
              ? (
                <div className="flex justify items-center">
                  <input
                    className="w-full rounded-lg p-2"
                    name={`tracks.${index}.title`}
                    {...register(`tracks.${index}.title`)}
                    defaultValue={item.title}
                  />
                  <div className="text-white px-2 cursor-pointer" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )
              : (
                <div className="flex justify-between cursor-pointer">
                  <p className="text-white pl-2">{item.title}</p>
                  <div className="text-white pr-2" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )}
          </div>

          <div className="col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden rounded-lg">
            {watch(`tracks.${index}.edit`)
              ? (
                <>
                  <img alt="ok" src={item.thumbnail} className="object-center object-cover w-full h-56 rounded-t-lg" />
                  <input
                    className="w-full rounded-b-lg p-1"
                    {...register(`tracks.${index}.thumbnail`)}
                    defaultValue={item.thumbnail}
                  />
                </>
              )
              : (
                <img alt="ok" src={item.thumbnail} className="object-center object-cover w-full h-64 rounded-lg" />
              )}

          </div>

          <div className="col-start-2 col-end-3 row-start-2 row-end-3 rounded-lg overflow-hidden">
            {watch(`tracks.${index}.edit`)
              ? (
                <>
                  <YouTube
                    className="w-full h-56"
                    videoId={item.videoId}
                  />
                  <input
                    className="w-full rounded-b-lg p-1"
                    {...register(`tracks.${index}.videoId`)}
                    defaultValue={item.videoId}
                  />
                </>
              )
              : (
                <YouTube
                  className="w-full h-64"
                  videoId={item.videoId}
                />
              )}
          </div>

          <div className="col-start-1 col-end-3 row-start-3 row-end-4">
            <NestedArray nestIndex={index} {...{ control, register, watch }} />
          </div>
        </div>
      ))}
    </>
  );
}

function UrlForms({ onSubmit }) {
  const {
    register, control, handleSubmit,
  } = useForm({
    defaultValues: {
      youtubeUrls: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "youtubeUrls",
  });

  const send = (data) => onSubmit(data);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 mb-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(send)}>
        <p className="text-white text-xs mb-1 opacity-70">Url</p>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
            <input
              {...register(`youtubeUrls.${index}`)}
              placeholder="Url"
              className="border-2 border-pink-500 p-1 rounded-lg mb-4"
            />
            <input
              type="button"
              value="Supprimer"
              className="rounded-lg text-white h-9 bg-pink-500"
              onClick={() => remove(index)}
            />
          </div>
        ))}

        <section>
          <input
            type="button"
            value="Add url"
            className="text-white w-full rounded-lg bg-pink-500 mb-4  h-9"
            onClick={() => append("")}
          />
        </section>

        <input
          type="submit"
          value="Submit"
          className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9"
        />
      </form>
    </div>
  );
}

function CreateTag() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [createCustomPlaylist] = useMutation(CREATE_CUSTOM_PLAYLIST);

  const [youtubeData, { data: dataD }] = useLazyQuery(YOUTUBE_DATA, {
    onCompleted: (data) => {
      enqueueSnackbar("Good", {
        variant: "success",
      });

      const defaultValues = data.youtubeData.map((track) => ({
        edit: false,
        answers: track?.keywords?.map((keyword) => ({ keyword })),
        thumbnail: track?.thumbnails[track.thumbnails.length - 1]?.url,
        ...track,
      }));
      setValue("tracks", defaultValues);
      setValue("creator", "60850a9c7b52ff34c652afc9");
    },
    onError: () => {
      enqueueSnackbar("Bad", {
        variant: "error",
      });
    },
  });

  const format = (data) => {
    const formattedData = {
      tagInput: {
        name: data.name,
        thumbnail: data.cover,
        creator: data.creator,
        tracks: [],
      },
      trackInputs: data.tracks.map(({
        edit, __typename, thumbnails, answers, ...rest
      }) => ({ ...rest, creator: data.creator, answers: answers.reduce((acc, val) => [...acc, val.keyword], []) })),
    };
    return formattedData;
  };

  const onSubmit = (data) => createCustomPlaylist({ variables: format(data) });

  return (
    <>
      <UrlForms onSubmit={(data) => youtubeData({ variables: data })} />
      {dataD
        && (
          <form
            className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-lg text-white">Name</p>
            <input
              className="w-full border-pink-500 border rounded-lg mb-2 p-2"
              name="name"
              {...register("name", { required: true })}
            />

            <p className="text-lg text-white">Cover</p>
            <input
              className="w-full border-pink-500 border rounded-lg mb-2 p-2"
              name="cover"
              {...register("cover", { required: true })}
            />

            <Fields
              {...{
                control, register, getValues, setValue, errors, watch,
              }}
            />
            <input
              type="submit"
              className="w-full p-2 bg-pink-500 rounded-lg text-white cursor-pointer"
              value="Submit my playlist"
            />
          </form>
        )}
    </>
  );
}

export default CreateTag;
