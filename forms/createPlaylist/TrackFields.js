/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import YouTube from "react-youtube";
import { useForm, useFieldArray } from "react-hook-form";

const AnswersManager = ({
  nestIndex, control, register,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `tracks.${nestIndex}.answers`,
  });

  return (
    <>
      <div className="gap-4 grid grid-cols-2">
        {fields.map((field, index) => (
          <>
            <input
              {...register(`tracks.${nestIndex}.answers.${index}.keyword`, { required: true })}
              defaultValue={field.keyword}
              placeholder={`Answer ${index + 1}`}
              autoComplete="off"
              className="w-full border-pink-500 border rounded-lg p-1"
            />

            <button
              type="button"
              onClick={fields.length > 1 ? () => remove(index) : () => { }}
              className={fields.length > 1 ? "w-full bg-pink-500 text-white rounded-lg p-1 cursor-pointer" : "w-full bg-pink-500 opacity-50 cursor-not-allowed text-white rounded-lg p-1"}
            >
              Delete answer
            </button>

          </>
        ))}

        <button
          type="button"
          onClick={() => append({ keyword: "" })}
          className="w-full bg-pink-500 text-white rounded-lg p-1"
        >
          Add answer
        </button>
      </div>
    </>
  );
};

function TrackFields({
  control, register, setValue, watch, keywords,
}) {
  const { handleSubmit } = useForm({ mode: "onChange" });

  const { fields } = useFieldArray({
    control,
    name: "tracks",
  });

  return (
    <form
      className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
    >
      {fields.map((item, index) => (
        <div
          className="shadow-lg bg-gray-800 border-b border-pink-500 rounded-lg gap-4 p-4 grid grid-cols-2 grid-flow-row mb-4"
          key={item.id}
        >
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2">
            {watch(`tracks.${index}.edit`)
              ? (
                <div className="flex justify items-center">
                  <input
                    className="w-full rounded-lg p-2"
                    name={`tracks.${index}.title`}
                    {...register(`tracks.${index}.title`, { required: true })}
                    defaultValue={item.title}
                  />
                  <div className="text-white px-2 cursor-pointer" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )
              : (
                <div className="flex justify-between cursor-pointer space-x-4">
                  <p className="text-white pl-2 truncate">{watch(`tracks.${index}.title`)}</p>
                  <div className="text-white pr-2" onClick={() => setValue(`tracks.${index}.edit`, !watch(`tracks.${index}.edit`))}>Edit</div>
                </div>
              )}
          </div>

          <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 overflow-hidden rounded-lg">
            {watch(`tracks.${index}.edit`)
              ? (
                <>
                  <img alt="ok" src={watch(`tracks.${index}.thumbnail`)} className="object-center object-cover w-full h-56 rounded-t-lg" />
                  <input
                    className="w-full rounded-b-lg p-1"
                    {...register(`tracks.${index}.thumbnail`, { required: true })}
                    defaultValue={item.thumbnail}
                  />
                </>
              )
              : (
                <img alt="ok" src={watch(`tracks.${index}.thumbnail`)} className="object-center object-cover w-full h-64 rounded-lg" />
              )}

          </div>

          <div className="col-start-1 col-end-3 row-start-3 row-end-4 md:col-start-2 md:md:col-end-3 md:row-start-2 md:row-end-3 rounded-lg overflow-hidden">
            <YouTube
              className="w-full h-64"
              videoId={item.videoId}
            />
          </div>

          <div className="col-start-1 col-end-3 row-start-4 row-end-5 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4">
            <AnswersManager nestIndex={index} keywords={keywords} {...{ control, register, watch }} />
          </div>
        </div>
      ))}

      <input
        type="submit"
        className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9"
        value="Submit"
      />
    </form>
  );
}

export default TrackFields;
