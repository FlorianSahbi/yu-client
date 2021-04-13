import AddUser from "../../forms/AddUser";
import Title from "../../components/Title";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

function CreateUserPage() {
  return (
    <>
      <Nav />
      <div className="bg-hero-endless-clouds bg-gray-900 h-screen w-screen p-4">
        <div className="mb-4">
          <Title back title="Ajouter un joueur" />
        </div>
        <AddUser />
      </div>
      <Footer />
    </>
  );
}

export default CreateUserPage;
