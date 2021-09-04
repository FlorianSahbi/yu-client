/* eslint-disable no-shadow */
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
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, thumbnail, answers, keywords, creator: creator?._id, edit: false, isNew: false, _id,
      }));
      setTracks(formattedTracks);
    },
  });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
      <form className="p-3 space-y-3">
        <p className="text-white text-xs opacity-70 ml-1">Search by title</p>
        <input
          className="w-full border-pink-500 border rounded-lg p-2 outline-none"
          placeholder="Final Fantasy, Game of Thrones, Interstellar..."
          {...register("filter")}
          onChange={(e) => findTracks({ variables: { title: e.target.value } })}
        />

        <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
          {tracks.map((track) => (
            <div onClick={() => setValue(`trackInputs.${index}`, track)}>
              <img
                className="rounded-lg"
                src={track.thumbnail}
                alt="me"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default FetchExistingTrack;
