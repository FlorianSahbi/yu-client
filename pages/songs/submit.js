import SubmitSong from "../../forms/SubmitSong";
import Title from "../../components/Title";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

function CreateSongPage() {
  return (
    <>
      <Nav />
      <div className="bg-hero-endless-clouds bg-gray-900 min-h-screen w-screen p-4">
        <div className="mb-4">
          <Title back title="Ajouter une musique" />
        </div>
        <SubmitSong />
      </div>
      <Footer />
    </>
  );
}

export default CreateSongPage;
