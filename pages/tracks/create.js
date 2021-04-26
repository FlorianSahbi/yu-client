import Layout from "../../layout/Layout";
import Title from "../../components/Title";
import Button from "../../components/Button";
import CreateTracks from "../../forms/CreateTracks";

function CreateSongPage() {
  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center">
          <Title title="Create tracks" />
          <Button value="Submit" />
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <CreateTracks />
        </div>
      </div>
    </Layout>
  );
}

export default CreateSongPage;
