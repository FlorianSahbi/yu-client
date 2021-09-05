/* eslint-disable no-shadow */
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

import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import TRACKS from "../graphql/tracks/tracks";

function FetchExistingTrack({ index }) {
  const { register } = useForm({ mode: "onChange" });
  const { setValue } = useFormContext();

  const [tracks, setTracks] = useState([]);

  const [findTracks] = useLazyQuery(TRACKS, {
    fetchPolicy: "network-only",
    onCompleted: ({ tracks }) => {
      const formattedTracks = tracks.map(({
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, thumbnail, answers, keywords, creator, _id,
      }) => ({
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, thumbnail, answers, keywords, creator: creator?._id, isNew: false, _id,
      }));
      setTracks(formattedTracks);
    },
  });

  return (
    <form>
      <div className="space-y-1">
        <p className="text-white text-xs opacity-70 ml-1">Search by title</p>
        <input
          className="w-full border-pink-500 border rounded-lg p-2 outline-none"
          placeholder="Final Fantasy, Game of Thrones, Interstellar..."
          {...register("filter")}
          onChange={(e) => findTracks({ variables: { title: e.target.value, limit: 6 } })}
        />
      </div>

      <div className="grid gap-4 grid-cols-6">
        {tracks.map((track) => (
          <div
            aria-hidden="true"
            onClick={() => setValue(`trackInputs.${index}`, track)}
            className="mt-3 cursor-pointer"
          >
            <img
              className="rounded-lg"
              src={track.thumbnail}
              alt="me"
            />
          </div>
        ))}
      </div>
    </form>
  );
}

export default FetchExistingTrack;
