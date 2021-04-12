import Songs from "../../components/Songs";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import Footer from "../../components/Footer";
import AddSong from "../../forms/AddSong";

function SongsPage() {
  return (
    <div className="bg-gray-900 bg-hero-endless-clouds">
      <Nav />
      <Title title="Musiques" />
      <Songs />
      <Footer />
    </div>
  )
}
export default SongsPage;
