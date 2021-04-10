import { memo } from "react";
import { useRouter } from 'next/router';
import { useQuery, gql } from "@apollo/client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import YouTube from "react-youtube";
import UpdateSong from '../../forms/UpdateSong';

const QUERY = gql`
  query Song($id: ID) {
    song(id: $id) {
      _id
      title
      cover
      url
      correctWords
      user {
        username
        avatar
      }
    }
  }
`;

function SongPage(props) {

  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useQuery(QUERY, { variables: { id: "6071e390cf50c126faa7ab14" } });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data && data?.song?.url.length > 4 ? (
    <div className="bg-gray-900 bg-hero-endless-clouds">
      <Nav />
      <div className="flex justify-center">
        <main className="inline-block p-4 bg-gray-700 m-10 rounded-lg border-b-4 border-pink-500">
          <YouTube
            videoId={data?.song?.url.replace("https://www.youtube.com/watch?v=", "")}
          />
        </main>
      </div>
      <UpdateSong id={id} />
      <Footer />
    </div>
  ) : {}
}

export default SongPage;
