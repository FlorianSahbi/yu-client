import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import TAGS_INDEX from "../../graphql/tags/tagsIndex";

function Tags({ limit = 0 }) {
  const { data, loading } = useQuery(TAGS_INDEX, {
    // fetchPolicy: "network-only",
    variables: { limit },
  });

  if (loading) {
    return (
      <Block>
        <Card loading />
      </Block>
    );
  }

  return (
    <Block>
      {data?.tags.map(({ _id, name, thumbnail }) => (
        <Card
          id={_id}
          title={name}
          thumbnail={thumbnail}
          subtitle="tags"
          color="yellow"
        />
      ))}
    </Block>
  );
}

export default Tags;
