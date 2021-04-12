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
      <div className="bg-gray-900 border-4 border-green-400">
        <Nav />
        <Link href={`/playlists/${id}/update`}>
          Edit
        </Link>
        {data?.playlist?.songs.map((s) => (
          <div>
            <p>{s.title}</p>
            <div className="flex justify-center border-4 border-red-400">
              <div className="bg-hero-endless-clouds inline-block p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
                <YouTube
                  videoId={s.url.replace("https://www.youtube.com/watch?v=", "")}
                />
              </div>
            </div>
          </div>
        ))}
        <Footer />
      </div>
    );
  }
}

export default PlaylistPage;
