import Link from "next/link";
import Users from "../../components/Users";
import Nav from "../../components/Nav";
import Title from "../../components/Title";
import Footer from "../../components/Footer";

function UsersPage() {
  return (
    <>
      <Nav />
      <div className="bg-gray-900 bg-hero-endless-clouds p-4 min-h-screen">
        <div className="mb-4 max-w-7xl mx-auto grid-col-2 grid">
          <div className="col-start-1 col-end-2">
            <Title title="Joueurs" />
          </div>
          <div className="col-start-2 col-end-3">
            <Link href="/users/create">
              <p className="text-lg cursor-pointer text-white w-full text-right">
                Ajouter
              </p>
            </Link>
          </div>
        </div>
        <Users />
      </div>
      <Footer />
    </>
  );
}

export default UsersPage;
