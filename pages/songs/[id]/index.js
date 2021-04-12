import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import { format } from "date-fns";
import Link from "next/link";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import GET_SONG from "../../../graphql/songs/getSong";
import WaitingScreen from "../../../components/WaitingScreen";

function SongPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_SONG, { variables: { id } });

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
        <div className="bg-hero-endless-clouds bg-gray-900 p-4">

          <div className="bg-hero-endless-clouds bg-gray-900 text-white max-w-7xl mb-4 mx-auto grid-flow-rows grid-cols-6 grid w-full gap-4 rounded-lg">

            {/* Date */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-1 row-end-2 md:col-start-1 md:col-end-4 md:row-start-1 md:row-end-2">
              {format(new Date(), "dd.MM.yyyy")}
            </div>

            {/* Playlist */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-6 row-end-9 md:col-start-4 md:col-end-7 md:row-start-1 md:row-end-4">
              <Link href={`/songs/${id}/update`}>
                Edit
              </Link>
            </div>

            {/* Title */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-2 row-end-3 md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3">
              {data?.song?.title}
            </div>

            {/* Cover */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-3 row-end-6 md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-6">
              <div className="h-full w-full">
                <img src={data?.song?.cover} alt="ok" className="h-full w-full object-cover" />
              </div>
            </div>

            {/* User */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-9 row-end-12 md:col-start-4 md:col-end-7 md:row-start-4 md:row-end-5">
              <div className="flex items-center">
                <img src={data?.song?.user?.avatar} alt="ok" className="rounded-full h-14 w-14 mr-1" />
                <p>{data?.song?.user?.username}</p>
              </div>
            </div>

            {/* Url */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-12 row-end-13 md:col-start-4 md:col-end-7 md:row-start-5 md:row-end-6">
              <p className="truncate">{data?.song?.url}</p>
            </div>

            {/* Preview */}
            <div className="bg-hero-endless-clouds bg-gray-700 border-b-4 border-pink-500 rounded-lg p-4 col-start-1 col-end-13 row-start-13 row-end-14 md:col-start-1 md:col-end-7 md:row-start-6 md:row-end-12">
              <YouTube
                className="w-full h-full"
                videoId={data?.song?.url.replace("https://www.youtube.com/watch?v=", "")}
              />
            </div>

          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default SongPage;
