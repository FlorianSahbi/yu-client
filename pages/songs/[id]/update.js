import { useRouter } from "next/router";
import UpdateSong from "../../../forms/UpdateSong";
import Title from "../../../components/Title";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

function UpdateSongPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen">
      <Nav />
      <Title title="Editer" />
      <UpdateSong id={id} />
      <Footer />
    </div>
  );
}

export default UpdateSongPage;
