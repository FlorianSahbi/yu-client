import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import AUTH from "../../graphql/auth/auth";
import { isLoggedInVar } from "../../cache";

function ProcessPage() {
  const router = useRouter();
  const { code } = router.query;
  console.log(code);
  if (code) {
    useQuery(AUTH, {
      fetchPolicy: "network-only",
      variables: { code },
      onCompleted: (data) => {
        localStorage.setItem("YuToken", JSON.stringify(data.auth.token));
        localStorage.setItem("currentUserId", data.auth.user._id);
        router.push("/");
        isLoggedInVar(true);
      },
    });
  }

  return (
    <div>

      wait
    </div>
  );
}

export default ProcessPage;
