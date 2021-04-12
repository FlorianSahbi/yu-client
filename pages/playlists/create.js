import AddPlaylist from "../../forms/AddSong";
import Title from "../../components/Title";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

function CreatePlaylistPage() {
  return (
    <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen">
      <Nav />
      <Title title="Ajouter une playlist" />
      <AddPlaylist />
      <Footer />
    </div>
  );
}

export default CreatePlaylistPage;
