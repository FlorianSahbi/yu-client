import { useRouter } from 'next/router';
import UpdatePlaylist from "../../../forms/UpdatePlaylist";
import Title from "../../../components/Title";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

function UpdatePlaylistPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen">
      <Nav />
      <Title title="Editer" />
      <UpdatePlaylist id={id} />
      <Footer />
    </div>
  )
}

export default UpdatePlaylistPage
