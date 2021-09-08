/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Layout from "../../../layout/Layout";
import Title from "../../../components/Title";
import TAG from "../../../graphql/tags/tag";
import UPDATE_TRACK_ADD_TAG from "../../../graphql/tracks/updateTracksAddTag";
import UPDATE_TRACKS_THUMBNAIL from "../../../graphql/tracks/updateTracksThumbnail";
import UPDATE_TAG_THUMBNAIL from "../../../graphql/tags/updateTagThumbnail";
import Card from "../../../layout/Card";
import Block from "../../../layout/Block";
import DeleteTagButton from "../../../components/DeleteTagButton";

function UserPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(TAG, {
    fetchPolicy: "network-only",
    variables: { id },
  });

  const {
    register, getValues,
  } = useForm({ mode: "onChange", defaultValues: { tagToAddId: "", newThumbnail: "", singleThumbnail: "" } });

  const [mutation] = useMutation(UPDATE_TRACK_ADD_TAG);

  const [updateTracksThumbnail] = useMutation(UPDATE_TRACKS_THUMBNAIL);

  const [updateTagThumbnail] = useMutation(UPDATE_TAG_THUMBNAIL);

  const handleTagBulk = () => {
    mutation({ variables: { id, tagToAddId: getValues("tagToAddId") } });
  };

  const handleThumbnailBulk = () => {
    updateTracksThumbnail({ variables: { id, thumbnail: getValues("newThumbnail") } });
  };

  const handleUpdateTagThumbnail = () => {
    updateTagThumbnail({ variables: { id, thumbnail: getValues("singleThumbnail") } });
  };

  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="Tag" />
            <Link href={`/tags/${id}/edit`}>
              <p>Edit</p>
            </Link>
            <DeleteTagButton id={id} />
          </div>
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="Bulk Add tag" />
            <form>
              <input
                {...register("tagToAddId")}
                type="text"
                placeholder="tag"
              />
              <input
                type="button"
                value="tagBulk"
                onClick={handleTagBulk}
              />
              <input
                {...register("newThumbnail")}
                type="text"
                placeholder="thumbnail"
              />
              <input
                type="button"
                value="thumbnailBulk"
                onClick={handleThumbnailBulk}
              />
              <input
                {...register("singleThumbnail")}
                type="text"
                placeholder="thumbnail"
              />
              <input
                type="button"
                value="thumbnailBulkSingle"
                onClick={handleUpdateTagThumbnail}
              />
            </form>
          </div>
        </div>

        <div className="row-start-3 row-end-4 col-start-1 col-end-13">
          <div className="rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <div className="grid gap-4 p-4 grid-cols-12">
              <div className="row-start-1 row-end-2 col-start-1 col-end-13">
                <div className="text-gray-300 row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center px-2">
                  <p>
                    {data?.tag?.name}
                  </p>
                  <p className="text-xs">
                    {`Added by : ${data?.tag?.creator?.username}`}
                  </p>
                </div>
              </div>
              <div className="row-start-2 row-end-3 col-start-1 col-end-13">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={data?.tag?.thumbnail}
                    className="bg-black h-96 w-full object-contain object-center"
                    alt="mol"
                  />
                </div>
              </div>
              <div className="row-start-3 row-end-4 col-start-1 col-end-13">
                <div className="row-start-3 row-end-4 col-start-1 col-end-13 text-gray-300 text-xs flex justify-between px-2">
                  <p className="capitalize">
                    {`Plays : ${data?.tag?.playCount}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-4 row-end-5 col-start-1 col-end-13">
          <div className="rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Block>
              {data?.tag?.tracks?.map(({ _id, title, thumbnail }) => <Card id={_id} title={title} subtitle="tracks" thumbnail={thumbnail} />)}
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
