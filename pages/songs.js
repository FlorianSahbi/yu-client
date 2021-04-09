import Songs from "../components/Songs";
import Nav from "../components/Nav";
import Title from "../components/Title";
import Footer from "../components/Footer";
import ClientOnly from "../components/ClientOnly";
import AddSong from "../forms/AddSong";

function SongsPage() {
  return (
    <div className="bg-gray-900">
      <p>ok</p>
      {/* <ClientOnly>
        <Nav />
        <Title title="Musiques" />
        <Songs />
        <Title title="Ajouter une Musique" />
        <AddSong />
        <Footer />
      </ClientOnly> */}
    </div>
  )
}
export default SongsPage;
