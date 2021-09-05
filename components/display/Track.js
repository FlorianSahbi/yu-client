import { Fragment } from "react";
import YouTube from "react-youtube";
import { useFormContext, useFieldArray } from "react-hook-form";

const AnswersManager = ({ index }) => {
  const {
    control, register, watch, formState: { errors },
  } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `trackInputs.${index}.answers`,
  });

  return (
    <div className="gap-4 grid grid-cols-2">
      {fields.map((field, i) => (
        <Fragment key={field.id}>
          <div className="space-y-1">
            <input
              {...register(`trackInputs.${index}.answers.${i}`, { required: true })}
              // defaultValue={field}
              placeholder={`Answer ${i + 1}`}
              autoComplete="off"
              className="w-full border-pink-500 border rounded-lg p-1 outline-none h-8"
            />
            {errors && errors.trackInputs && errors.trackInputs[index] && errors.trackInputs[index].answers && errors.trackInputs[index].answers[i] && <p className="text-red-500 text-xs ml-1">Please set at least one answer</p>}
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            disabled={watch(`trackInputs.${index}.answers`) < 1}
            className={watch(`trackInputs.${index}.answers`) < 1 ? "h-8 opacity-50 w-full bg-pink-500 text-white rounded-lg p-1" : "h-8 w-full bg-pink-500 text-white rounded-lg p-1"}
          >
            Delete answer
          </button>
        </Fragment>
      ))}

      <button
        type="button"
        onClick={() => append({ keyword: "" })}
        className="w-full bg-pink-500 text-white rounded-lg p-1 h-8"
      >
        Add answer
      </button>
    </div>
  );
};

function TrackFields({ index }) {
  const { watch } = useFormContext();

  return (
    <div className="shadow-lg bg-gray-800 border-b border-pink-500 rounded-lg gap-4 p-4 grid grid-cols-2 grid-flow-row">
      <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2">
        <div className="flex justify-between cursor-pointer space-x-4">
          <p className="text-white pl-2 truncate">{watch(`trackInputs.${index}.title`)}</p>
        </div>
      </div>

      <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 overflow-hidden rounded-lg">
        <img alt="ok" src={watch(`trackInputs.${index}.thumbnail`)} className="object-center object-cover w-full h-64 rounded-lg" />
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
  );
}

export default TrackFields;
