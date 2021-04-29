/* eslint-disable jsx-a11y/click-events-have-key-events */
import { isLoggedInVar } from "../cache";

const DiscordSignoutButton = () => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    onClick={() => {
      localStorage.removeItem("YuToken");
      localStorage.removeItem("currentUserId");
      isLoggedInVar(false);
    }}
  >
    signout
  </div>
);

export default DiscordSignoutButton;
