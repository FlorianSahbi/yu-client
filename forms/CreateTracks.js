/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import { useSnackbar } from "notistack";
import CREATE_TRACKS from "../graphql/tracks/createTracks";
import DISCORD_ID from "../graphql/local/discordId";
import FetchYoutubeData from "./FetchYoutubeData";

const Answers = ({
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
                  {...register(`tracks.${nestIndex}.answers.${index}.keyword`, { required: true })}
                  defaultValue={field.keyword}
                  placeholder="Answer"
                  className="w-full border-pink-500 border rounded-lg p-1"
                />

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-full bg-pink-500 text-white rounded-lg p-1"
                  >
                    Delete answer
                  </button>
                )}
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
          <>
            <p className="text-white">Answers</p>
            <div className="grid gap-2 grid-cols-2 py-1 md:grid-cols-4">
              {fields.map((field, index) => (
                <p className="text-white text-xs w-full truncate">
                  {`# ${index + 1} : ${field.keyword}`}
                </p>
              ))}
            </div>
          </>
        )}
    </>
  );
};

function TrackFields({
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
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2">
            {watch(`tracks.${index}.edit`)
              ? (
                <div className="flex justify items-center">
                  <input
                    className="w-full rounded-lg p-2"
                    name={`tracks.${index}.title`}
                    {...register(`tracks.${index}.title`, { required: true })}
                    defaultValue={item.title}
                  />
                  <div className="text-white px-2 cursor-pointer" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )
              : (
                <div className="flex justify-between cursor-pointer space-x-4">
                  <p className="text-white pl-2 truncate">{watch(`tracks.${index}.title`)}</p>
                  <div className="text-white pr-2" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )}
          </div>

          <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 overflow-hidden rounded-lg">
            {watch(`tracks.${index}.edit`)
              ? (
                <>
                  <img alt="ok" src={watch(`tracks.${index}.thumbnail`)} className="object-center object-cover w-full h-56 rounded-t-lg" />
                  <input
                    className="w-full rounded-b-lg p-1"
                    {...register(`tracks.${index}.thumbnail`, { required: true })}
                    defaultValue={item.thumbnail}
                  />
                </>
              )
              : (
                <img alt="ok" src={watch(`tracks.${index}.thumbnail`)} className="object-center object-cover w-full h-64 rounded-lg" />
              )}

          </div>

          <div className="col-start-1 col-end-3 row-start-3 row-end-4 md:col-start-2 md:md:col-end-3 md:row-start-2 md:row-end-3 rounded-lg overflow-hidden">
            <YouTube
              className="w-full h-64"
              videoId={item.videoId}
            />
          </div>

          <div className="col-start-1 col-end-3 row-start-4 row-end-5 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4">
            <Answers nestIndex={index} {...{ control, register, watch }} />
          </div>
        </div>
      ))}
    </>
  );
}

function CreateTracks() {
  const { enqueueSnackbar } = useSnackbar();
  useQuery(DISCORD_ID, {
    onCompleted: ({ currentUserId }) => {
      setValue("creator", currentUserId);
    },
  });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const handleYoutubeData = (data) => {
    setValue("tracks", data);
  };

  const [createTracks] = useMutation(CREATE_TRACKS, {
    onCompleted: () => enqueueSnackbar("Good", { variant: "success" }),
    onError: () => enqueueSnackbar("Bad", { variant: "error" }),
  });

  const format = (data) => {
    const formattedData = {
      trackInputs: data.tracks.map(({
        edit, __typename, thumbnails, answers, ...rest
      }) => ({ ...rest, creator: data.creator, answers: answers.reduce((acc, val) => [...acc, val.keyword], []) })),
    };
    return formattedData;
  };

  const onSubmit = (data) => createTracks({ variables: format(data) });

  return (
    <>
      <FetchYoutubeData YoutubeData={(data) => handleYoutubeData(data)} />
      {watch("tracks") && (
        <form
          className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TrackFields
            {...{
              control, register, getValues, setValue, errors, watch,
            }}
          />
          <input
            type="submit"
            className={`${isValid ? "bg-pink-500 hover:bg-pink-600 " : "bg-pink-500 opacity-50 cursor-not-allowed "}text-white cursor-pointer w-full rounded-lg h-9`}
            value="Submit"
            disabled={!isValid}
          />
        </form>
      )}
    </>
  );
}

export default CreateTracks;
