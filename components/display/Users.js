import { useQuery } from "@apollo/client";
import Block from "../../layout/Block";
import Card from "../../layout/Card";
import USERS_INDEX from "../../graphql/users/usersIndex";
import getRandomPicture from "../../utils/getRandomPicture";

function Users({ limit = 0 }) {
  const { data, loading } = useQuery(USERS_INDEX, {
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
      {data?.users.map(({ _id, discordData: { id, username, avatar } }) => (
        <Card
          id={_id}
          title={username}
          thumbnail={avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg` : getRandomPicture()}
          subtitle="users"
          color="blue"
        />
      ))}
    </Block>
  );
}

export default Users;
