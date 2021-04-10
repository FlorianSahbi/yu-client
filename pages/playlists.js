import Playlist from "../components/Playlists";
import Nav from "../components/Nav";
import Title from "../components/Title";
import AddPlaylist from "../forms/AddPlaylist";
import Footer from "../components/Footer";

function PlaylistsPage() {
  return (
    <div className="bg-gray-900">
      <Nav />
      <Title title="Playlists" />
      <Playlist />
      <Title title="Ajouter une playlist" />
      <AddPlaylist />
      <Footer />
    </div>
  )
}
export default PlaylistsPage;
