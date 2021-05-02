import { useForm, useFieldArray } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { useSnackbar } from "notistack";
import YOUTUBE_DATA from "../graphql/youtube/youtubeData";

function FetchYoutubeData({ YoutubeData }) {
  const { enqueueSnackbar } = useSnackbar();

  const [fetchYoutubeData, { loading }] = useLazyQuery(YOUTUBE_DATA, {
    onError: () => enqueueSnackbar("Bad", { variant: "error" }),
    onCompleted: ({ youtubeData }) => {
      enqueueSnackbar("Good", { variant: "success" });

      const defaultValues = youtubeData.map((track) => ({
        edit: false,
        answers: [{ keyword: "" }],
        keywords: track?.keywords?.map((keyword) => ({ keyword })),
        thumbnail: track?.thumbnails[track.thumbnails.length - 1]?.url,
        ...track,
      }));

      YoutubeData(defaultValues);
    },

  });

  const {
    register, control, handleSubmit, formState: { errors, isValid },
  } = useForm({ mode: "onChange", defaultValues: { youtubeUrls: [""] } });

  const { fields, append, remove } = useFieldArray({ control, name: "youtubeUrls" });

  const onSubmit = (data) => fetchYoutubeData({ variables: data });

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 mb-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <p className="text-white text-xs opacity-70">Urls</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <input
                {...register(`youtubeUrls.${index}`, { required: true })}
                placeholder={`#${index + 1} : https://www.youtube.com/watch?v=[VIDEO_ID]`}
                className="border-2 border-pink-500 p-1 rounded-lg"
              />
              {errors.youtubeUrls && <p className="text-red-600 text-xs">An URL is required</p>}
            </div>
            {fields.length > 1 && (
              <input
                type="button"
                value="Supprimer"
                className="rounded-lg text-white h-9 bg-pink-500"
                onClick={() => remove(index)}
              />
            )}
          </div>
        ))}

        <input
          type="button"
          value="Add url"
          className="text-white w-full rounded-lg bg-pink-500 mb-4 h-9 cursor-pointer hover:bg-pink-600"
          onClick={() => append("")}
        />

        <input
          type="submit"
          disabled={!isValid}
          value={`${!loading ? "Fetch video data" : "Fetching..."}`}
          className={`${isValid && !loading ? "bg-pink-500 hover:bg-pink-600 " : "bg-pink-500 opacity-50 cursor-not-allowed "}text-white cursor-pointer w-full rounded-lg h-9`}
        />
      </form>
    </div>
  );
}

export default FetchYoutubeData;
