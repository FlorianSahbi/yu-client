/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import YouTube from "react-youtube";
import { useSnackbar } from "notistack";
import { setDate } from "date-fns";
import TRACK_FOR_UPDATE from "../../../graphql/tracks/trackForUpdate";
import EDIT_TRACK from "../../../graphql/tracks/editTrack";

const AnswersManager = ({
  control, register,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `track.answers`,
  });

  return (
    <>
      <div className="gap-4 grid grid-cols-2">
        {fields.map((field, index) => (
          <>
            <input
              {...register(`track.answers.${index}.keyword`, { required: true })}
              defaultValue={field.keyword}
              placeholder={`Answer ${index + 1}`}
              autoComplete="off"
              className="w-full border-pink-500 border rounded-lg p-1"
            />

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
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

function TrackFields({
  control, register, setValue, watch,
}) {
  return (
    <>
      <div
        className="shadow-lg bg-gray-800 border-b border-pink-500 rounded-lg gap-4 p-4 grid grid-cols-2 grid-flow-row mb-4"
      >
        <div className="col-start-1 col-end-3 row-start-1 row-end-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2">
          {watch(`track.edit`)
            ? (
              <div className="flex justify items-center">
                <input
                  className="w-full rounded-lg p-2"
                  name="track.title"
                  {...register(`track.title`, { required: true })}
                />
                <div className="text-white px-2 cursor-pointer" onClick={() => setValue(`track.edit`, !watch(`track.edit`))}>Edit</div>
              </div>
            )
            : (
              <div className="flex justify-between cursor-pointer space-x-4">
                <p className="text-white pl-2 truncate">{watch(`track.title`)}</p>
                <div className="text-white pr-2" onClick={() => setValue(`track.edit`, !watch(`track.edit`))}>Edit</div>
              </div>
            )}
        </div>

        <div className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 overflow-hidden rounded-lg">
          {watch(`track.edit`)
            ? (
              <>
                <img alt="ok" src={watch(`track.thumbnail`)} className="object-center object-cover w-full h-56 rounded-t-lg" />
                <input
                  className="w-full rounded-b-lg p-1"
                  {...register(`track.thumbnail`, { required: true })}
                />
              </>
            )
            : (
              <img alt="ok" src={watch(`track.thumbnail`)} className="object-center object-cover w-full h-64 rounded-lg" />
            )}

        </div>

        <div className="col-start-1 col-end-3 row-start-3 row-end-4 md:col-start-2 md:md:col-end-3 md:row-start-2 md:row-end-3 rounded-lg overflow-hidden">
          <YouTube
            className="w-full h-64"
            videoId={watch("track.videoId")}
          />
        </div>

        <div className="col-start-1 col-end-3 row-start-4 row-end-5 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-4">
          <AnswersManager {...{ control, register, watch }} />
        </div>
      </div>
    </>
  );
}

function EditTrack() {
  const router = useRouter();
  const { id } = router.query;

  const {
    register, handleSubmit, setValue, watch, reset, control,
  } = useForm({
    mode: "onChange",
  });

  const { loading } = useQuery(TRACK_FOR_UPDATE, {
    fetchPolicy: "network-only",
    variables: { id },
    onCompleted: (data) => {
      const a = data?.track?.answers.map((a) => ({ keyword: a }));
      const d = { track: { ...data?.track, answers: a } };
      reset(d);
    },
  });

  const [editTrack] = useMutation(EDIT_TRACK, {
    onCompleted: (truc) => {
      console.log(truc);
      // router.push(`/tags/${truc.createCustomPlaylist._id}`);
    },
    onError: (err) => console.log(err),
  });

  function format(data) {
    delete data.__typename;
    delete data.edit;
    const answers = data.answers.map((answer) => answer.keyword);
    return { ...data, answers };
  }

  const onSubmit = ({ track }) => editTrack({ variables: { id, trackInput: format(track) } });
  // const onSubmit = ({ track }) => console.log(track);

  return (
    <form
      className="bg-hero-endless-clouds max-w-7xl mx-auto p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500"
      onSubmit={handleSubmit(onSubmit)}
    >

      {!loading && (
        <TrackFields
          {...{
            control, register, setValue, watch,
          }}
        />
      )}

      <input
        type="submit"
        className="bg-pink-500 hover:bg-pink-600 text-white cursor-pointer w-full rounded-lg h-9"
        value="Submit"
      />
    </form>
  );
}

export default EditTrack;
