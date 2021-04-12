import Playlist from "../../components/Playlists";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import Footer from "../../components/Footer";

function PlaylistsPage() {
  return (
    <div className="bg-gray-900 bg-hero-endless-clouds">
      <Nav />
      <Title title="Playlists" />
      <Playlist />
      <Footer />
    </div>
  );
}
export default PlaylistsPage;
