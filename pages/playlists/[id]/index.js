import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import Nav from "../../../components/Nav";
import Title from "../../../components/Title";
import Footer from "../../../components/Footer";
import GET_PLAYLIST from "../../../graphql/playlists/getPlaylist";
import WaitingScreen from "../../../components/WaitingScreen";

function PlaylistPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_PLAYLIST, { variables: { id } });

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
        <div className="bg-hero-endless-clouds bg-gray-900 pt-4">

          <div className="mb-4 max-w-7xl mx-auto grid-col-2 grid">
            <div className="col-start-1 col-end-2">
              <Title back title={data?.playlist?.name} />
            </div>
            <div className="col-start-2 col-end-3">
              <Link href="/playlists/create">
                <p className="text-lg cursor-pointer text-white w-full text-right">
                  Editer
                </p>
              </Link>
            </div>
          </div>

          {data?.playlist?.songs.map((s) => (
            <div className="w-full">
              <p className="text-center text-white truncate py-4">
                {s.title}
              </p>
              <div className="flex justify-center w-full">
                <YouTube
                  containerClassName="w-full"
                  className="w-full"
                  videoId={s.url.replace("https://www.youtube.com/watch?v=", "")}
                />
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  }
}

export default PlaylistPage;
