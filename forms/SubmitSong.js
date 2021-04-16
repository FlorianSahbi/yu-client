import { useForm, useFieldArray } from "react-hook-form";
import {
  gql, useMutation, useLazyQuery, useQuery,
} from "@apollo/client";
import { useSnackbar } from "notistack";
import { useState } from "react";
import YouTube from "react-youtube";
import { PencilAltIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import SelectUserInput from "../components/SelectUserInput";
import ADD_SONG from "../graphql/songs/addSong";
import GET_SONG_DATA from "../graphql/youtube/getSongData";
import GET_TAGS from "../graphql/tags/getTags";

function AddSong() {
  const { data: dataTag } = useQuery(GET_TAGS);
  const [songData, setSongData] = useState({ cover: "", title: "", url: "" });
  const [edit, setEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register, handleSubmit, control, setValue,
  } = useForm({
    defaultValues: {
      title: songData.title,
      url: "",
      cover: songData.cover,
      user: "",
      correctWords: [{ value: "" }],
      tags: [""],
    },
  });

  const {
    register: ytdlReg, handleSubmit: ytdlSub, watch,
  } = useForm({
    defaultValues: {
      url: "https://www.youtube.com/watch?v=9qHBBCjKzuw",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "correctWords" });
  useFieldArray({ control, name: "tags" });

  const [addSongMutation] = useMutation(ADD_SONG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
    update(cache, { data: { addSong } }) {
      cache.modify({
        fields: {
          songs(existingSongs = []) {
            const newSongRef = cache.writeFragment({
              data: addSong,
              fragment: gql`
                fragment NewSong on Song {
                  _id
                  title
                  cover
                  url
                }
              `,
            });
            return [...existingSongs, newSongRef];
          },
        },
      });
    },
  });

  const [getSongThumbnail] = useLazyQuery(GET_SONG_DATA, {
    onCompleted: ({ getSongData: { cover, title, url } }) => {
      setSongData({ url, cover, title });
      setValue("title", title);
      setValue("cover", cover);
      enqueueSnackbar("Good", {
        variant: "success",
      });
    },
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  const onSubLink = (data) => {
    setValue("url", data.url);
    getSongThumbnail({ variables: { ...data } });
  };
  const onSubSong = (data) => addSongMutation({ variables: { ...data, correctWords: data.correctWords.map((w) => w.value), tags: data.tags.filter((t) => t) } });

  return (
    <div className="max-w-7xl mx-auto">
      <form
        className="bg-hero-endless-clouds grid bg-gray-700 grid-flow-row auto-rows-min p-4 gap-4 grid-col-1 rounded-lg"
        onSubmit={ytdlSub(onSubLink)}
      >
        <div className="row-start-1 row-end-2 ">
          <p className="text-white text-xs opacity-70 mb-1">
            Lien
          </p>
          <input
            placeholder="Url"
            className="border-2 px-1 border-pink-500 rounded-lg w-full h-9"
            defaultValue=""
            {...ytdlReg("url", { required: true })}
          />
        </div>
        <div className="row-start-2 row-end-3 ">
          <input
            type="submit"
            className="text-white w-full rounded-lg bg-pink-500 h-9"
          />
        </div>
      </form>

      <form
        className="bg-hero-endless-clouds bg-gray-700 p-4 my-4 gap-4 rounded-lg grid-cols-12 grid grid-flow-row auto-rows-min"
        onSubmit={handleSubmit(onSubSong)}
      >
        {/* -- Title -- */}
        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          {edit
            ? (
              <>
                <input
                  placeholder="Title"
                  className="border border-pink-500 p-1 rounded-lg w-full"
                  {...register("title", { required: true })}
                />
              </>
            )
            : (
              <div className="flex items-center space-x-1">
                <p className="text-gray-300">
                  {songData.title}
                </p>
                <PencilAltIcon className="text-gray-300 h-4 cursor-pointer" onClick={() => setEdit((prev) => !prev)} />
              </div>
            )}
        </div>

        {/* -- Preview -- */}
        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <YouTube
            videoId={watch("url").replace("https://www.youtube.com/watch?v=", "")}
            className="w-full"
            containerClassName="w-full rounded-lg overflow-hidden"
            // onReady={(event) => event.target.playVideo()}
            // onStateChange={(event) => event.target.playVideo()}
            // Sur pc seulement
          />
        </div>

        {/* -- Cover -- */}
        <div className="row-start-3 row-end-4 col-start-1 col-end-13 sm:col-end-6 rounded-lg overflow-hidden">
          <img src={songData.cover} alt="mol" />
          <input
            placeholder="Cover"
            className="p-1 rounded-b-lg w-full outline-none"
            {...register("cover", { required: true })}
          />
        </div>

        {/* -- Tags -- */}
        <div className="row-start-5 row-end-6 col-start-1 col-end-13 overflow-auto h-48 text-white rounded-lg p-2 text-base bg-gray-700 shadow-lg">
          {dataTag?.tags?.docs.map((a, i) => (
            <>
              <input
                key={a._id}
                {...register(`tags.${i}`)}
                value={a._id}
                type="checkbox"
              />
              <label htmlFor={a.name}>{a.name}</label>
            </>
          ))}
        </div>

        {/* -- Words -- */}
        <div className="row-start-4 row-end-5 col-start-1 col-end-13 grid grid-flow-row auto-rows-min grid-col-1 gap-4 text-base">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="h-9 flex items-center"
            >
              <input
                {...register(`correctWords.${index}.value`)}
                defaultValue={field}
                placeholder={`Word ${index + 1}`}
                className="border border-pink-500 p-1 rounded-lg w-full"
              />
              <MinusCircleIcon
                className="text-gray-300 h-7 cursor-pointer"
                onClick={() => remove(index)}
              />
              {index === fields.length - 1 && (
                <PlusCircleIcon
                  className="text-gray-300 h-7 cursor-pointer"
                  onClick={() => append({ value: "" })}
                />
              )}
            </div>
          ))}
        </div>

        <SelectUserInput placeholder="Select an user" defaultValue="" register={register} />
        <input type="submit" className="col-start-1 col-end-13 text-white w-full rounded-lg bg-pink-500 h-9" />
      </form>
    </div>
  );
}

export default AddSong;
