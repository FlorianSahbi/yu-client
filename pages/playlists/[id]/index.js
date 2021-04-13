import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import Nav from "../../../components/Nav";
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
          <div className="text-white text-center">
            <Link href={`/playlists/${id}/update`}>
              Edit
            </Link>
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
