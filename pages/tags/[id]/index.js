import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Title from "../../../components/Title";
import GET_TAG from "../../../graphql/tags/getTag";
import WaitingScreen from "../../../components/WaitingScreen";

function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_TAG, { variables: { id } });

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
          <main className="inline-block p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
            {/* <img src={data?.user?.avatar} alt="fe" /> */}
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserPage;
