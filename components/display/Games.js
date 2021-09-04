import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import LAST_GAMES from "../../graphql/games/lastGames";

function Tags() {
  const { data, loading, error } = useQuery(LAST_GAMES, {
    fetchPolicy: "network-only",
  });

  return (
    <Block>
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <Card loading={loading} />}
      {!loading && data?.lastGames.length > 0 && data?.lastGames.map(({
        _id, name, history,
      }) => (
        <Card
          id={_id}
          title={name}
          subtitle="games"
          thumbnail={history[0]?.track?.thumbnail}
          color="yellow"
        />
      ))}
      {!loading && data?.lastGames.length <= 0 && <p className="row-start-1 col-start-1 row-end-2 col-end-6 text-white">No game to display, maybe you havent played any game yet or maybe you should authenticate first</p>}
    </Block>
  );
}

export default Tags;
