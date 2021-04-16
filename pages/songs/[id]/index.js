/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import YouTube from "react-youtube";
import { useSnackbar } from "notistack";
import Footer from "../../../components/Footer";
import Nav from "../../../components/Nav";
import GET_SONG from "../../../graphql/songs/getSong";
import ACCEPT_SONG from "../../../graphql/songs/acceptSong";
import WaitingScreen from "../../../components/WaitingScreen";

function SongPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_SONG, { variables: { id } });
  const [, setIsAccepted] = useState(data?.song?.isAccepted);
  const [acceptSongMutation] = useMutation(ACCEPT_SONG, {
    onCompleted: () => enqueueSnackbar("Good", {
      variant: "success",
    }),
    onError: () => enqueueSnackbar("Bad", {
      variant: "error",
    }),
  });

  function handleClick() {
    acceptSongMutation({ variables: { id } });
    setIsAccepted(true);
  }

  if (loading) {
    return <WaitingScreen />;
  }

  if (error) {
    return null;
  }

  if (data) {
    return (
      <>
        <Nav />
        <div className="bg-hero-endless-clouds bg-gray-900 w-full p-4">
          <div className="max-w-7xl mx-auto space-y-4">

            {/* Block Top */}
            <div className="bg-hero-endless-clouds grid bg-gray-700 grid-flow-row auto-rows-min p-4 gap-4 grid-col-1 rounded-lg">
              <div className="row-start-1 row-end-2 flex items-center justify-between">
                <p className="text-white text-xs opacity-70">
                  <Link href={data?.song?.url} passHref target="blank_">
                    <a target="_blank">
                      {data?.song?.url}
                    </a>
                  </Link>
                </p>
                {data?.song?.isAccepted
                  ? (
                    <div className="text-white text-xs text-center w-20 rounded-lg px-2 py-2 transition-all transform border text-pink border-pink-500">
                      Accepted
                    </div>
                  )
                  : (
                    <div onClick={handleClick} className="text-white w-20 text-center text-xs bg-pink-500 rounded-lg px-2 py-2 cursor-pointer transition-all transform bg-gradient-to-b border border-pink-500 from-pink-500 to-pink-500 hover:from-pink-500 hover:to-pink-600">
                      Accept
                    </div>
                  ) }
              </div>
            </div>

            {/* Block Mid */}
            <div className="bg-hero-endless-clouds bg-gray-700 p-4 gap-4 rounded-lg grid-cols-12 grid grid-flow-row auto-rows-min">
              {/* -- Title -- */}
              <div className="row-start-1 row-end-2 col-start-1 col-end-13 flex items-center">
                <p className="text-gray-300">
                  {data?.song?.title}
                </p>
              </div>

              {/* -- Preview -- */}
              <div className="row-start-2 row-end-3 col-start-1 col-end-13">
                <YouTube
                  videoId={data?.song?.url.replace("https://www.youtube.com/watch?v=", "")}
                  className="w-full"
                  containerClassName="w-full rounded-lg overflow-hidden"
                  onReady={(event) => event.target.playVideo()}
                />
              </div>

              {/* User */}
              <div className="row-start-3 row-end-4 col-start-1 col-end-13 text-gray-300 text-xs flex justify-between">
                <p>
                  {`Added by : ${data?.song?.user?.username}`}
                </p>
                <p className="capitalize">
                  {`Tags : ${data?.song?.tags.map((a) => a.name)}`}
                </p>
              </div>
            </div>

            {/* Block Bot */}
            <div className="bg-hero-endless-clouds bg-gray-700 p-4 gap-4 rounded-lg grid-cols-12 grid grid-flow-row auto-rows-min">
              {/* -- Cover -- */}
              <div className="row-start-1 row-end-2 col-start-1 col-end-13">
                <div className="rounded-lg overflow-hidden">
                  <img src={data?.song?.cover} alt="mol" />
                </div>
              </div>
              {/* User */}
              <div className="row-start-2 row-end-3 col-start-1 col-end-13 text-gray-300 text-xs flex justify-between">
                <p className="capitalize">
                  {`Answers : ${data?.song?.correctWords?.map((a) => a)}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return <></>;
}

export default SongPage;
