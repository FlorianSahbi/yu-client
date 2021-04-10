import { useRouter } from 'next/router';
import { useQuery, gql } from "@apollo/client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import YouTube from "react-youtube";
import UpdateSong from '../../forms/UpdatePlaylist';

const QUERY = gql`
  query Playlist($id: ID) {
    playlist(id: $id) {
      _id
      name
      thumbnail
      songs {
          _id
          title
          cover
          url
      }
    }
  }
`;

function PlaylistPage() {
  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useQuery(QUERY, { variables: { id } });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data ? (
    <div className="bg-gray-900 border-4 border-green-400 bg-hero-endless-clouds">
      <Nav />
      {data?.playlist?.songs.map(s => {
        return (
          <>
            <p>{s.title}</p>
            <div className="flex justify-center border-4 border-red-400">
              <div className="inline-block p-4 bg-gray-700 m-10 rounded-lg border-b-4 border-pink-500">
                <YouTube
                  videoId={s.url.replace("https://www.youtube.com/watch?v=", "")}
                />
              </div>
            </div>
          </>
        )
      })}
      <UpdateSong id={id} />
      <Footer />
    </div>
  ) : {}
}

export default PlaylistPage;
