/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import Link from "next/link";
import Layout from "../../../layout/Layout";
import TRACK from "../../../graphql/tracks/track";
import Title from "../../../components/Title";

function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(TRACK, { fetchPolicy: "network-only", variables: { id } });
  console.log(data);
  const inputEl = useRef(null);

  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">

        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="Track" />
            <Link href={`/tracks/${id}/edit`}>
              <p>Button</p>
            </Link>
          </div>
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <div className="rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <div className="grid gap-4 p-4 grid-cols-12">
              <div className="row-start-1 row-end-2 col-start-1 col-end-13">
                <div className="text-gray-300 row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center px-2">
                  <p>
                    {data?.track?.title}
                  </p>
                  <p className="text-xs">
                    {`Added by : ${data?.track?.creator?.username}`}
                  </p>
                </div>
              </div>
              <div className="row-start-2 row-end-3 col-start-1 col-end-13">
                <div className="rounded-lg overflow-hidden relative">
                  <YouTube
                    videoId={data?.track?.videoId}
                    ref={inputEl}
                    className="w-full h-96 relative z-10"
                    containerClassName="w-full rounded-lg overflow-hidden relative z-10"
                    opts={{ playerVars: { modestbranding: 1, rel: 0, showinfo: 0 } }}
                  />
                  <img
                    src={data?.track?.thumbnail}
                    className="bg-black transition-opacity duration-1000 ease-in-out absolute h-96 w-full object-contain object-center"
                    alt="mol"
                  />
                </div>
              </div>
              <div className="row-start-4 row-end-5 col-start-1 col-end-13">
                <div className="row-start-3 row-end-4 col-start-1 col-end-13 text-gray-300 text-xs flex justify-between px-2">
                  <p className="capitalize">
                    {`Answers : ${data?.track?.answers?.map((a) => a)}`}
                  </p>
                  <p className="capitalize">
                    {`Tags : ${data?.track?.tags.map((a) => a.name)}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <img
              src={data?.track?.thumbnail}
              className="bg-black transition-opacity h-96 w-full object-contain object-center"
              alt="mol"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TrackPage;
