import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import USER from "../../../graphql/users/user";
import WaitingScreen from "../../../components/WaitingScreen";

function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(USER, { variables: { id } });

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
        <div className="flex justify-center">
          <main className="inline-block p-4 bg-gray-700 rounded-lg border-b-4 border-pink-500">
            <img src={data?.user?.avatar} alt="fe" />
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserPage;
