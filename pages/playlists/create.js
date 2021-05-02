import Layout from "../../layout/Layout";
import Title from "../../components/Title";
import Button from "../../components/Button";
import CreatePlaylist from "../../forms/CreatePlaylist";

function CreatePlaylistPage() {
  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center">
          <Title title="Create a playlist" />
          <Button value="Submit" />
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <CreatePlaylist />
        </div>
      </div>
    </Layout>
  );
}

export default CreatePlaylistPage;
