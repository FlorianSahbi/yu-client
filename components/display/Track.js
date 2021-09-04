/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import YouTube from "react-youtube";
import { useFormContext, useFieldArray } from "react-hook-form";

const AnswersManager = ({ index }) => {
  const { control, register } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `trackInputs.${index}.answers`,
  });

  return (
    <>
      <div className="gap-4 grid grid-cols-2">
        {fields.map((field, i) => (
          <>
            <input
              {...register(`trackInputs.${index}.answers.${i}.keyword`, { required: true })}
              defaultValue={field.keyword}
              placeholder={`Answer ${i + 1}`}
              autoComplete="off"
              className="w-full border-pink-500 border rounded-lg p-1"
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(i)}
                className="w-full bg-pink-500 text-white rounded-lg p-1"
              >
                Delete answer
              </button>
            )}
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

function TrackFields({ index }) {
  const { register, setValue, watch } = useFormContext();

  return (
    <>
      <div className="shadow-lg bg-gray-800 border-b border-pink-500 rounded-lg gap-4 p-4 grid grid-cols-2 grid-flow-row m-3">
        <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2">
          {watch(`trackInputs.${index}.edit`)
            ? (
              <div className="flex justify items-center">
                <input
                  className="w-full rounded-lg p-2 outline-none"
                  name={`trackInputs.${index}.title`}
                  defaultValue={watch(`trackInputs.${index}.title`)}
                  {...register(`trackInputs.${index}.title`, { required: true })}
                />
                <div className="text-white px-2 cursor-pointer" onClick={() => setValue(`trackInputs.${index}.edit`, !watch(`trackInputs.${index}.edit`))}>Edit</div>
              </div>
            )
            : (
              <div className="flex justify-between cursor-pointer space-x-4">
                <p className="text-white pl-2 truncate">{watch(`trackInputs.${index}.title`)}</p>
                <div className="text-white pr-2" onClick={() => setValue(`trackInputs.${index}.edit`, !watch(`trackInputs.${index}.edit`))}>Edit</div>
              </div>
            )}
        </div>

        <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 overflow-hidden rounded-lg">
          {watch(`trackInputs.${index}.edit`)
            ? (
              <>
                <img alt="ok" src={watch(`trackInputs.${index}.thumbnail`)} className="object-center object-cover w-full h-56 rounded-t-lg" />
                <input
                  className="w-full rounded-b-lg p-1 outline-none"
                  defaultValue={watch(`trackInputs.${index}.thumbnail`)}
                  {...register(`trackInputs.${index}.thumbnail`, { required: true })}
                />
              </>
            )
            : (
              <img alt="ok" src={watch(`trackInputs.${index}.thumbnail`)} className="object-center object-cover w-full h-64 rounded-lg" />
            )}

        </div>

        <div className="col-start-1 col-end-3 row-start-3 row-end-4 md:col-start-2 md:md:col-end-3 md:row-start-2 md:row-end-3 rounded-lg overflow-hidden">
          <YouTube
            className="w-full h-64"
            videoId={watch(`trackInputs.${index}.videoId`)}
          />
        </div>

        <div className="col-start-1 col-end-3 row-start-4 row-end-5 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4">
          <AnswersManager index={index} />
        </div>
      </div>
    </>
  );
}

export default TrackFields;
