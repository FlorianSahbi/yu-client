import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import USERS from "../../graphql/users/users";

function Users() {
  const { data, loading, error } = useQuery(USERS, {
    fetchPolicy: "network-only",
  });

  return (
    <Block>
      {error && <p className="text-white col-start-1 col-end-7">{JSON.stringify(error)}</p>}
      {loading && <Card loading={loading} />}
      {!loading && data?.users.map(({ _id, username, discordData: { id, avatar } }) => (
        <Card
          id={_id}
          title={username}
          subtitle="users"
          thumbnail={`https://cdn.discordapp.com/avatars/${id}/${avatar?.replace(`https://cdn.discordapp.com/avatars/${id}`, "").replace(".webp", "")}.webp`}
          color="blue"
          loading={loading}
        />
      ))}
    </Block>
  );
}

export default Users;
