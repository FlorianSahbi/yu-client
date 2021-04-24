/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useForm, useFieldArray } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import YouTube from "react-youtube";
import GET_TRACK_FROM_URL from "../graphql/utils/getTracksFromUrl";

const NestedArray = ({
  nestIndex, control, register, watch,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `tracks.${nestIndex}.correctWords`,
  });

  return (
    <>
      {watch(`tracks.${nestIndex}.edit`)
        ? (
          <div className="gap-4 grid grid-cols-2">
            {fields.map((item, j) => (
              <>
                <input
                  {...register(`tracks.${nestIndex}.correctWords.${j}.val`)}
                  defaultValue={item.val}
                  className="w-full border-pink-500 border rounded-lg p-1"
                />

                <button
                  type="button"
                  onClick={() => remove(j)}
                  className="w-full bg-pink-500 text-white rounded-lg p-1"
                >
                  Delete answer
                </button>
              </>
            ))}

            <button
              type="button"
              onClick={() => append({ val: "field1" })}
              className="w-full bg-pink-500 text-white rounded-lg p-1"
            >
              Add answer
            </button>
          </div>
        )
        : (
          <div className="flex w-100 justify-evenly">
            {fields.map((item, j) => (
              <p className="text-white text-sm pl-2">
                {`Answer ${j + 1} : ${item.val}`}
              </p>
            ))}
          </div>
        )}
    </>
  );
};

function Fields({
  control, register, setValue, getValues, watch,
}) {
  const { fields, remove } = useFieldArray({
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
          <div className="col-start-1 col-end-3 row-start-1 row-end-2">
            {watch(`tracks.${index}.edit`)
              ? (
                <div className="flex justify items-center">
                  <input
                    className="w-full rounded-lg p-2"
                    name={`tracks.${index}.title`}
                    {...register(`tracks.${index}.title`)}
                    defaultValue={item.title}
                  />
                  <div className="text-white px-2 cursor-pointer" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )
              : (
                <div className="flex justify-between cursor-pointer">
                  <p className="text-white pl-2">{item.title}</p>
                  <div className="text-white pr-2" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )}
          </div>

          <div className="col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden rounded-lg">
            {watch(`tracks.${index}.edit`)
              ? (
                <>
                  <img alt="ok" src={item.cover} className="object-center object-cover w-full h-56 rounded-t-lg" />
                  <input
                    className="w-full rounded-b-lg p-1"
                    {...register(`tracks.${index}.cover`)}
                    defaultValue={item.cover}
                  />
                </>
              )
              : (
                <img alt="ok" src={item.cover} className="object-center object-cover w-full h-64 rounded-lg" />
              )}

          </div>

          <div className="col-start-2 col-end-3 row-start-2 row-end-3 rounded-lg overflow-hidden">
            {watch(`tracks.${index}.edit`)
              ? (
                <>
                  <YouTube
                    className="w-full h-56"
                    videoId={item.url.replace("https://www.youtube.com/watch?v=", "")}
                  />
                  <input
                    className="w-full rounded-b-lg p-1"
                    {...register(`tracks.${index}.url`)}
                    defaultValue={item.url}
                  />
                </>
              )
              : (
                <YouTube
                  className="w-full h-64"
                  videoId={item.url.replace("https://www.youtube.com/watch?v=", "")}
                />
              )}
          </div>

          <div className="col-start-1 col-end-3 row-start-3 row-end-4">
            <NestedArray nestIndex={index} {...{ control, register, watch }} />
          </div>
        </div>
      ))}
    </>
  );
}

function UrlForms({ onSubmit }) {
  const {
    register, control, handleSubmit,
  } = useForm({
    defaultValues: {
      urls: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "urls",
  });

  const send = (data) => onSubmit(data);

  return (
    <div className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
      <form className="flex flex-col" onSubmit={handleSubmit(send)}>
        <p className="text-white text-xs mb-1 opacity-70">Musiques</p>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Url"
              className="border-2 border-pink-500 p-1 rounded-lg mb-4"
              {...register(`urls.${index}.url`)}
            />
            <input type="button" value="Supprimer" className="rounded-lg text-white h-9 bg-pink-500" onClick={() => remove(index)} />
          </div>
        ))}
        <section>
          <button
            className="text-white w-full rounded-lg bg-pink-500 mb-4  h-9"
            type="button"
            onClick={() => {
              append({ url: "" });
            }}
          >
            Ajouter une musique
          </button>
        </section>

        <input type="submit" className="text-white w-full mb-4 rounded-lg bg-pink-500 h-9" />
      </form>
    </div>
  );
}

function AddPlaylist() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [getTracksFromUrl, { data: dataD }] = useLazyQuery(GET_TRACK_FROM_URL, {
    onCompleted: (data) => {
      const defaultValuesTwo = data?.getTracksFromUrl?.map((track) => ({
        edit: false, title: track.title, cover: track.thumbnails[track.thumbnails.length - 1].url, url: track.videoUrl, correctWords: track.keywords.map((key) => ({ val: key })),
      }));
      setValue("tracks", defaultValuesTwo);
    },
    onError: (error) => console.log(error),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <UrlForms onSubmit={(data) => getTracksFromUrl({ variables: { urls: data.urls.map(({ url }) => url) } })} />
      {dataD
        && (
          <form
            className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-lg text-white">Name</p>
            <input
              className="w-full border-pink-500 border rounded-lg mb-2 p-2"
              name="name"
              {...register("name", { required: true })}
            />

            <p className="text-lg text-white">Cover</p>
            <input
              className="w-full border-pink-500 border rounded-lg mb-2 p-2"
              name="cover"
              {...register("cover", { required: true })}
            />

            <Fields
              {...{
                control, register, getValues, setValue, errors, watch,
              }}
            />
            <input type="submit" className="w-full p-2 bg-pink-500 rounded-lg text-white cursor-pointer" value="Submit my playlist" />
          </form>
        )}
    </>
  );
}

export default AddPlaylist;
