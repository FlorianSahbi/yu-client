import { useRouter } from "next/router";
import UpdatePlaylist from "../../../forms/UpdatePlaylist";
import Title from "../../../components/Title";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

function UpdatePlaylistPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Nav />
      <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen p-4">
        <div className="mb-4">
          <Title title="Editer" />
        </div>
        <UpdatePlaylist id={id} />
      </div>
      <Footer />
    </>
  );
}

export default UpdatePlaylistPage;
