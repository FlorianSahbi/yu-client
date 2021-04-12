import AddPlaylist from "../../forms/AddSong";
import Title from "../../components/Title";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

function CreatePlaylistPage() {
  return (
    <>
      <Nav />
      <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen p-4">
        <div className="mb-4">
          <Title title="Ajouter une playlist" />
        </div>
        <AddPlaylist />
      </div>
      <Footer />
    </>
  );
}

export default CreatePlaylistPage;
