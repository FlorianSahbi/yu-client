import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Title from "../../../components/Title";
import { Song } from "../../../components/Songs";
import GET_TAG from "../../../graphql/tags/getTag";
import GET_SONGS from "../../../graphql/songs/getSongs";
import WaitingScreen from "../../../components/WaitingScreen";

function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_TAG, { variables: { id } });
  const { data: dSongs, error: eSongs, loading: lSongs } = useQuery(GET_SONGS, { variables: { tag: id } });

  if (loading) {
    return <WaitingScreen />;
  }

  if (error) {
    return null;
  }

  if (data) {
    return (
      <div className="bg-gray-900 bg-hero-endless-clouds">
        <Nav />
        <div className="mb-4 max-w-7xl mx-auto grid-col-2 grid">
          <div className="col-start-1 col-end-2">
            <Title back title={data?.tag?.name} />
          </div>
          <div className="col-start-2 col-end-3">
            <Link href="/tags/create">
              <p className="text-lg cursor-pointer text-white w-full text-right">
                Editer
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">

          <div className="bg-hero-endless-clouds max-w-7xl mx-auto grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-4 p-4 grid bg-gray-700 rounded-lg border-b-4 border-pink-500">
            {eSongs && <p>Error...</p>}
            {lSongs && <h2 className="text-white">Loading...</h2>}
            {dSongs?.songs.map(({
              _id, cover, title, url, played,
            }) => (
              <Song
                id={_id}
                cover={cover}
                title={title}
                url={url}
                played={played}
              />
            ))}
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}

export default UserPage;
