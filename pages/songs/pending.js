import Songs from "../../components/Songs";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import Footer from "../../components/Footer";

function SongsPage() {
  return (
    <>
      <Nav />
      <div className="bg-gray-900 bg-hero-endless-clouds p-4 min-h-screen">
        <div className="mb-4 max-w-7xl mx-auto grid-col-2 grid">
          <div className="col-start-1 col-end-2">
            <Title back title="Musiques en attente" />
          </div>
        </div>
        <Songs pending />
      </div>
      <Footer />
    </>
  );
}

export default SongsPage;
