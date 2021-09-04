/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useFormContext } from "react-hook-form";
import FetchYoutubeTrack from "../forms/FetchYoutubeTrack";
import TrackFields from "./display/Track";
import FetchExistingTrack from "../forms/FetchExistingTrack";

function AddTrack({ field, index }) {
  const { watch } = useFormContext();

  return (
    <div key={field.id} className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500">
      <FetchExistingTrack index={index} />
      <FetchYoutubeTrack index={index} />

      {watch(`trackInputs.${index}`) !== undefined && (
        <TrackFields index={index} />
      )}
    </div>
  );
}

export default AddTrack;
