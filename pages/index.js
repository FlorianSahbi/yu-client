import Head from "next/head";
import { useRouter } from "next/router";
import Users from "../components/Users";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tracks from "../components/Tracks";
import Games from "../components/Games";
import Title from "../components/Title";
import Tags from "../components/Tags";
import en from "../locales/en";
import fr from "../locales/fr";

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;
  return (
    <>
      <Head>
        <title>Yu's blind test manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className="bg-gray-900 bg-hero-endless-clouds p-4">
        <Header title={t.title} />
        <div className="my-4">
          <Title title="Games" />
        </div>
        <Games />
        <div className="my-4">
          <Title title="Themes" />
        </div>
        <Tags />
        <div className="my-4">
          <Title title="Tracks" />
        </div>
        <Tracks />
        <div className="my-4">
          <Title title="Users" />
        </div>
        <Users />
      </div>
      <Footer />
    </>
  );
}
