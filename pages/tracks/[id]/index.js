/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import Layout from "../../../layout/Layout";
import TRACK from "../../../graphql/tracks/track";
import Title from "../../../components/Title";

function TrackPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showThumbnail, setShowThumbnail] = useState(true);
  const { data } = useQuery(TRACK, { fetchPolicy: "network-only", variables: { id } });

  const inputEl = useRef(null);

  function handleThumbnailClick() {
    if (showThumbnail === true) {
      setTimeout(() => {
        setShowThumbnail(false);
      }, 500);
      const upVol = setInterval(async () => {
        inputEl.current.internalPlayer.setVolume(await inputEl.current.internalPlayer.getVolume() + 10);
      }, 100);
      setTimeout(() => {
        clearInterval(upVol);
      }, 1100);
      inputEl.current.internalPlayer.playVideo();
    }
    if (showThumbnail === false) {
      setShowThumbnail(true);
      const lowVol = setInterval(async () => {
        inputEl.current.internalPlayer.setVolume(await inputEl.current.internalPlayer.getVolume() - 10);
      }, 100);
      setTimeout(() => {
        clearInterval(lowVol);
      }, 1100);
      setTimeout(() => {
        inputEl.current.internalPlayer.pauseVideo();
      }, 1000);
    }
  }

  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="Track" />
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
                    onClick={handleThumbnailClick}
                    className={`${showThumbnail ? "opacity-100 " : "opacity-0 "}top-0 z-20 bg-black transition-opacity duration-1000 ease-in-out absolute h-96 w-full object-contain object-center`}
                    alt="mol"
                  />
                </div>
              </div>
              <div className="row-start-3 row-end-4 col-start-1 col-end-13">
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
      </div>
    </Layout>
  );
}

export default TrackPage;
