/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@apollo/client";
import YouTube from "react-youtube";
import { useSnackbar } from "notistack";
import CREATE_TRACKS from "../graphql/tracks/createTracks";
import FetchYoutubeData from "./FetchYoutubeData";

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

function CreateTracks() {
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

  const handleYoutubeData = (data) => {
    setValue("tracks", data);
    setValue("creator", "60850a9c7b52ff34c652afc9");
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
      <form
        className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields
          {...{
            control, register, getValues, setValue, errors, watch,
          }}
        />
        <input
          type="submit"
          className="w-full p-2 bg-pink-500 rounded-lg text-white cursor-pointer"
          value="Submit my tracks"
        />
      </form>
    </>
  );
}

export default CreateTracks;
