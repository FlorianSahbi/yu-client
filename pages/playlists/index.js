import Link from "next/link";
import Playlist from "../../components/Playlists";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import Footer from "../../components/Footer";

function PlaylistsPage() {
  return (
    <>
      <Nav />
      <div className="bg-gray-900 bg-hero-endless-clouds p-4 min-h-screen">
        <div className="mb-4 max-w-7xl mx-auto grid-col-2 grid">
          <div className="col-start-1 col-end-2">
            <Title back title="Playlists" />
          </div>
          <div className="col-start-2 col-end-3">
            <Link href="/playlists/create">
              <p className="text-lg cursor-pointer text-white w-full text-right">
                Ajouter
              </p>
            </Link>
          </div>
        </div>
        <Playlist />
      </div>
      <Footer />
    </>
  );
}

export default PlaylistsPage;
