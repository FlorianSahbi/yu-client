import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import GAMES from "../../graphql/games/games";

function Games() {
  const { data, loading, error } = useQuery(GAMES);

  return (
    <Block>
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <Card loading={loading} />}
      {!loading && data?.games.map(({ _id, thumbnail, name }) => (
        <Card
          id={_id}
          title={name}
          subtitle="games"
          thumbnail={thumbnail}
          color="red"
          loading={loading}
        />
      ))}
    </Block>
  );
}

export default Games;
