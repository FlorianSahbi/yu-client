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
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const { setValue } = useFormContext({ mode: "onChange" });

  const [fetchYoutubeData] = useLazyQuery(YOUTUBE_TRACK, {
    fetchPolicy: "network-only",
    onCompleted: ({ youtubeTrack }) => {
      const {
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, keywords, thumbnails,
      } = youtubeTrack;
      setValue(`trackInputs.${index}`, {
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, keywords, answers: [""], thumbnail: thumbnails[thumbnails.length - 1]?.url, creator: null, edit: false, isNew: true,
      });
    },
  });

  const onSubmit = (youtubeUrl) => fetchYoutubeData({ variables: youtubeUrl });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto bg-gray-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 space-y-3 border-b-4 border-pink-500"
      >
        <p className="text-white text-xs opacity-70 ml-1">Import track from Youtube</p>
        <div className="flex space-x-3">
          <input
            className="w-9/12 border-pink-500 border rounded-lg p-2 outline-none"
            placeholder="https://www.youtube.com/watch?v=[VIDEO_ID]"
            {...register("youtubeUrl")}
          />

          <input
            type="submit"
            value="Fetch track"
            className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-3/12 rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default FetchYoutubeTrack;
