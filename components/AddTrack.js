import { useFormContext } from "react-hook-form";
import FetchYoutubeTrack from "../forms/FetchYoutubeTrack";
import TrackFields from "./display/Track";
import FetchExistingTrack from "../forms/FetchExistingTrack";

function AddTrack({ index }) {
  const { watch } = useFormContext();
  return (
    <div className="bg-hero-endless-clouds rounded-lg max-w-7xl mx-auto bg-gray-700 border-b-4 border-pink-500 p-3 space-y-3">
      {!watch(`trackInputs.${index}.title`) && (
        <div className="space-y-3">
          <FetchExistingTrack index={index} />
          <FetchYoutubeTrack index={index} />
        </div>
      )}

      {watch(`trackInputs.${index}.title`) && (
        <TrackFields index={index} />
      )}
    </div>
  );
}

export default AddTrack;
