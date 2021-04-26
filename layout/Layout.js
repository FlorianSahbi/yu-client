import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <div className="min-h-screen w-screen bg-gray-900 bg-hero-endless-clouds">
      <div className="h-full w-full grid grid-cols-12">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          <Nav />
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <Header />
        </div>
        <div className="row-start-3 row-end-4 col-start-1 col-end-13">
          {children}
        </div>
        <div className="row-start-4 row-end-5 col-start-1 col-end-13">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
