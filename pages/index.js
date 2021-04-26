import Head from "next/head";
import Layout from "../layout/Layout";
import Title from "../components/Title";
import Tracks from "../components/display/Tracks";
import Tags from "../components/display/Tags";
import Users from "../components/display/Users";
// import Games from "../components/display/Games";

export default function Home() {
  return (
    <>
      <Head>
        <title>Yu's blind test manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
          <div className="row-start-1 row-end-2 col-start-1 col-end-13">
            <Title title="Tracks" />
          </div>

          <div className="row-start-2 row-end-3 col-start-1 col-end-13">
            <Tracks />
          </div>

          <div className="row-start-3 row-end-4 col-start-1 col-end-13">
            <Title title="Tags" />
          </div>

          <div className="row-start-4 row-end-5 col-start-1 col-end-13">
            <Tags />
          </div>

          <div className="row-start-5 row-end-6 col-start-1 col-end-13">
            <Title title="Users" />
          </div>

          <div className="row-start-6 row-end-7 col-start-1 col-end-13">
            <Users />
          </div>

          {/* <div className="row-start-7 row-end-8 col-start-1 col-end-13">
            <Title title="Games" />
          </div>

          <div className="row-start-8 row-end-9 col-start-1 col-end-13">
            <Games />
          </div> */}
        </div>
      </Layout>
    </>
  );
}
