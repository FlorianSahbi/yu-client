import Layout from "../../../layout/Layout";
import Title from "../../../components/Title";
import EditTags from "../../../forms/EditTags";

function EditTagsPage() {
  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center">
          <Title title="Edit a tag" />
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <EditTags />
        </div>
      </div>
    </Layout>
  );
}

export default EditTagsPage;
