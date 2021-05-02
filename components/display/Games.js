import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import GAMES from "../../graphql/games/games";

function Tags() {
  const { data, loading, error } = useQuery(GAMES, {
    fetchPolicy: "network-only",
  });

  return (
    <Block>
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <Card loading={loading} />}
      {!loading && data?.games.map(({
        _id, name, history,
      }) => (
        <Card
          id={_id}
          title={name}
          subtitle="games"
          thumbnail={history[0].track.thumbnail}
          color="yellow"
        />
      ))}
    </Block>
  );
}

export default Tags;
