import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import TRACKS_INDEX from "../../graphql/tracks/tracksIndex";

function Tracks({ limit = 0 }) {
  const { data, loading } = useQuery(TRACKS_INDEX, {
    fetchPolicy: "network-only",
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
      {data?.tracks.map(({ _id, thumbnail, title }) => (
        <Card
          id={_id}
          title={title}
          thumbnail={thumbnail}
          subtitle="tracks"
          color="pink"
        />
      ))}
    </Block>
  );
}

export default Tracks;
