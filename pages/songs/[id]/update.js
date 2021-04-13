import { useRouter } from "next/router";
import UpdateSong from "../../../forms/UpdateSong";
import Title from "../../../components/Title";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

function UpdateSongPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Nav />
      <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen p-4">
        <div className="mb-4">
          <Title back title="Editer" />
        </div>
        <UpdateSong id={id} />
      </div>
      <Footer />
    </>
  );
}

export default UpdateSongPage;
