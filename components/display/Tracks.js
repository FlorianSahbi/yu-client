import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import TRACKS from "../../graphql/tracks/tracks";

function Tracks({ pending }) {
  const { data, loading, error } = useQuery(TRACKS);

  const filter = pending ? ({ isAccepted }) => (!isAccepted) : ({ isAccepted }) => (isAccepted);

  return (
    <Block>
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <Card loading />}
      {!loading && data.tracks.filter(filter).map(({ _id, thumbnail, title }) => (
        <Card
          id={_id}
          title={title}
          subtitle="tracks"
          thumbnail={thumbnail}
          color="pink"
        />
      ))}
    </Block>
  );
}

export default Tracks;
