/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import YouTube from "react-youtube";
import { useSnackbar } from "notistack";
import DISCORD_ID from "../graphql/local/discordId";
import FetchYoutubeData from "./FetchYoutubeData";
import TAG from "../graphql/tags/tag";

const t = [
  {
    answers: [],
    category: "Entertainment",
    edit: false,
    keywords: ["dream", "commentary", "connor pugs", "jadyn", "acheeto", "dream minecraft", "joey barke", "mcyt", "dream smp", "dream drama explained", "chris chan", "leafy", "markiplier", "jacksepticeye situation", "game theory", "drama", "leafy drama", "chris chan arrested", "chris chan drama", "vanegood", "i miss leafy", "did you hear about leafy", "did you hear about what chris chan did", "do you think chris chan is innocent", "did you hear about what happened to jacksepticeye", "Did you hear about what Markiplier did?", "uncle al"],
    lengthSeconds: "37",
    ownerChannelName: "Joey Barke",
    thumbnail: "https://i.ytimg.com/vi/43VMGFQhlwY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVHbg8pF9WutPuvcYQn2f7MlgFqQ",
    thumbnails: [],
    title: "Did you hear about what Dream did?",
    videoId: "43VMGFQhlwY",
    videoUrl: "https://www.youtube.com/watch?v=43VMGFQhlwY",
  }];

const AnswersManager = ({
  nestIndex, control, register,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `tracks.${nestIndex}.answers`,
  });

  return (
    <>
      <div className="gap-4 grid grid-cols-2">
        {fields.map((field, index) => (
          <>
            <input
              {...register(`tracks.${nestIndex}.answers.${index}.keyword`, { required: true })}
              defaultValue={field.keyword}
              placeholder={`Answer ${index + 1}`}
              autoComplete="off"
              className="w-full border-pink-500 border rounded-lg p-1"
            />

            <button
              type="button"
              onClick={fields.length > 1 ? () => remove(index) : () => { }}
              className={fields.length > 1 ? "w-full bg-pink-500 text-white rounded-lg p-1 cursor-pointer" : "w-full bg-pink-500 opacity-50 cursor-not-allowed text-white rounded-lg p-1"}
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
    </>
  );
};

function TrackFields({
  control, register, setValue, watch, keywords,
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
            <AnswersManager nestIndex={index} keywords={keywords} {...{ control, register, watch }} />
          </div>
        </div>
      ))}
    </>
  );
}

function EditTags() {
  const router = useRouter();
  const { id } = router.query;
  const [keywords, setKeywords] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useQuery(DISCORD_ID, {
    fetchPolicy: "network-only",
    onCompleted: ({ currentUserId }) => {
      setValue("tagInput.creator", currentUserId);
      setValue("creator", currentUserId);
    },
  });

  const {
    control, register, handleSubmit, setValue, watch,
  } = useForm({ mode: "onChange" });

  const { data, loading, error } = useQuery(TAG, {
    variables: { id },
    fetchPolicy: "network-only",
    onCompleted: (d) => {
      setValue("tagInput.name", d.tag.name);
      setValue("tagInput.thumbnail", d.tag.thumbnail);
      const t = d.tag.tracks.map((track) => ({
        answers: track.answers.map((a) => ({ keyword: a })),
        category: track.category,
        edit: false,
        keywords: track.keywords,
        lengthSeconds: track.lengthSeconds,
        ownerChannelName: track.ownerChannelName,
        thumbnail: track.thumbnail,
        thumbnails: [],
        title: track.title,
        videoId: track.videoId,
        videoUrl: track.videoUrl,
      }));
      setValue("tracks", t);
    },
  });

  const handleYoutubeData = (data) => {
    setValue("tracks", data);
    setKeywords(data.keywords);
  };

  // const [EditTags] = useMutation(CREATE_CUSTOM_PLAYLIST, {
  //   onCompleted: (truc) => {
  //     router.push(`/tags/${truc.createCustomPlaylist._id}`);
  //     enqueueSnackbar("Good", { variant: "success" });
  //   },
  //   onError: () => enqueueSnackbar("Bad", { variant: "error" }),
  // });

  const format = (data) => {
    const formattedData = {
      tagInput: data.tagInput,
      trackInputs: data.tracks.map(({
        edit, __typename, thumbnails, answers, ...rest
      }) => ({ ...rest, creator: data.creator, answers: answers.reduce((acc, val) => [...acc, val.keyword], []) })),
    };
    return formattedData;
  };

  const onSubmit = (data) => EditTags({ variables: format(data) });

  return (
    <>
      <form
        className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-gray-300 text-xs ml-2 mb-1">Name</p>
        <input
          className="w-full border-pink-500 border rounded-lg p-2 mb-2"
          placeholder="Name"
          {...register(`tagInput.name`, { required: true })}
        />

        <p className="text-gray-300 text-xs ml-2 mb-1">Thumbnail</p>
        <input
          placeholder="Thumbnail"
          className="w-full border-pink-500 border rounded-lg p-2 mb-4"
          {...register(`tagInput.thumbnail`, { required: true })}
        />

        <TrackFields
          keywords={keywords}
          {...{
            control, register, setValue, watch, keywords,
          }}
        />

        <input
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9"
          value="Submit"
        />
      </form>
    </>
  );
}

export default EditTags;
