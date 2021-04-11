import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import UpdateUser from "../../forms/UpdateUser";
import GET_USER from "../../graphql/users/getUser";
import WaitingScreen from "../../components/WaitingScreen";

function SongPage() {

  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useQuery(GET_USER, { variables: { id } });

  if (loading) {
    return <WaitingScreen />;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return data ? (
    <div className="bg-gray-900 bg-hero-endless-clouds">
      <Nav />
      <div className="flex justify-center">
        <main className="inline-block p-4 bg-gray-700 m-10 rounded-lg border-b-4 border-pink-500">
          <img src={data?.user?.avatar} alt="fe" />
        </main>
      </div>
      <UpdateUser id={id} />
      <Footer />
    </div>
  ) : {}
}

export default SongPage;
