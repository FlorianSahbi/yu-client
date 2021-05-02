import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import TAGS from "../../graphql/tags/tags";

function Tags() {
  const { data, loading, error } = useQuery(TAGS, {
    fetchPolicy: "network-only",
  });

  return (
    <Block>
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <Card loading={loading} />}
      {!loading && data?.tags.map(({ _id, name, thumbnail }) => (
        <Card
          id={_id}
          title={name}
          subtitle="tags"
          thumbnail={thumbnail}
          color="yellow"
        />
      ))}
    </Block>
  );
}

export default Tags;
