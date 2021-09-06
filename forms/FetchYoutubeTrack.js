import { useSnackbar } from "notistack";
import { useFormContext } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import YOUTUBE_TRACK from "../graphql/youtube/youtubeTrack";

function FetchYoutubeTrack({ field, index }) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register, setValue, getValues, formState: { errors },
  } = useFormContext();

  const [fetchYoutubeData, { loading }] = useLazyQuery(YOUTUBE_TRACK, {
    onCompleted: ({ youtubeTrack }) => {
      enqueueSnackbar(`Track data of "${youtubeTrack.title}" successfully fetched`, {
        variant: "success",
      });

      const {
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, keywords, thumbnails,
      } = youtubeTrack;

      setValue(`trackInputs.${index}`, {
        title, videoUrl, videoId, lengthSeconds, category, ownerChannelName, keywords, thumbnail: thumbnails[thumbnails.length - 1]?.url, creator: null, isNew: true,
      });
    },
    onError: (error) => {
      enqueueSnackbar(`Something went wrong : ${error}`, {
        variant: "error",
      });
    },
  });

  const handleClick = () => {
    const youtubeUrl = getValues(`trackInputs.${index}.youtubeLink`);
    fetchYoutubeData({ variables: { youtubeUrl } });
  };

  return (
    <div className="space-y-1">
      <p className="text-white text-xs opacity-70 ml-1">Import track from Youtube</p>
      <div className="flex space-x-3">
        <input
          className="w-9/12 border-pink-500 border rounded-lg p-2 outline-none"
          placeholder="https://www.youtube.com/watch?v=[VIDEO_ID]"
          {...register(`trackInputs.${index}.youtubeLink`, { required: true, pattern: /^https:\/\/www\.youtube\.com\/watch\?v=.*$/ })}
          defaultValue={field.youtubeLink}
        />
        <input
          type="button"
          disabled={loading}
          value={loading ? "Fetching..." : "Fetch track"}
          // className={isValid ? "bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-3/12 rounded-lg" : "opacity-50 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-3/12 rounded-lg"}
          className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-3/12 rounded-lg"
          onClick={handleClick}
        />
      </div>
      {errors && errors.trackInputs && errors.trackInputs[index] && errors.trackInputs[index].youtubeLink === "required" && <p className="text-red-500 text-xs ml-1">A youtube url is required</p>}
      {errors && errors.trackInputs && errors.trackInputs[index] && errors.trackInputs[index].youtubeLink === "pattern" && <p className="text-red-500 text-xs ml-1">Must be : https://www.youtube.com/watch?v=[VIDEO_ID]</p>}
    </div>
  );
}

export default FetchYoutubeTrack;
