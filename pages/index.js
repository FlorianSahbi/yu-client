import Head from "next/head";
import Users from "../components/Users";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Songs from "../components/Songs";
import Title from "../components/Title";
import Playlists from "../components/Playlists";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yu's blind test manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className="bg-gray-900 bg-hero-endless-clouds p-4">
        <Header />
        <Title title="Playlists" />
        <Playlists />
        <Title title="Songs" />
        <Songs />
        <Title title="Users" />
        <Users />
      </div>
      <Footer />
    </>
  );
}
