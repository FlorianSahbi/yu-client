/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// type trackInput {
//   title: String
//   videoUrl: String
//   videoId: String
//   lengthSeconds: String
//   category: String
//   ownerChannelName: String
//   thumbnail: String
//   answers: [String]
//   keywords: [String]
//   creator: ID
//   tags: [ID]
// }

import { useForm, useFormContext } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import YOUTUBE_TRACK from "../graphql/youtube/youtubeTrack";

function FetchYoutubeTrack({ index }) {
  const {
    register, handleSubmit, reset, formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const { setValue } = useFormContext({ mode: "onChange" });

  const [fetchYoutubeData, { loading }] = useLazyQuery(YOUTUBE_TRACK, {
    fetchPolicy: "network-only",
    onCompleted: ({ youtubeTrack }) => {
      const {
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, keywords, thumbnails,
      } = youtubeTrack;
      setValue(`trackInputs.${index}`, {
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, keywords, answers: [""], thumbnail: thumbnails[thumbnails.length - 1]?.url, creator: null, isNew: true,
      });
      reset();
    },
  });

  const onSubmit = (youtubeUrl) => fetchYoutubeData({ variables: youtubeUrl });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <p className="text-white text-xs opacity-70 ml-1">Import track from Youtube</p>
        <div className="flex space-x-3">
          <input
            className="w-9/12 border-pink-500 border rounded-lg p-2 outline-none"
            placeholder="https://www.youtube.com/watch?v=[VIDEO_ID]"
            {...register("youtubeUrl", { required: true, pattern: /^https:\/\/www\.youtube\.com\/watch\?v=.*$/ })}
          />
          <input
            type="submit"
            disabled={loading}
            value={loading ? "Fetching..." : "Fetch track"}
            className={isValid ? "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-3/12 rounded-lg" : "opacity-50 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-3/12 rounded-lg"}
          />

        </div>
        {errors.youtubeUrl?.type === "required" && <p className="text-red-500 text-xs ml-1">A youtube url is required</p>}
        {errors.youtubeUrl?.type === "pattern" && <p className="text-red-500 text-xs ml-1">Must be : https://www.youtube.com/watch?v=[VIDEO_ID]</p>}
      </div>
    </form>
  );
}

export default FetchYoutubeTrack;
