/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import { LinkIcon } from "@heroicons/react/solid";
import Layout from "../../../layout/Layout";
import Title from "../../../components/Title";
import GAME from "../../../graphql/games/game";

function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(GAME, { variables: { id } });

  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="Game" />
          </div>
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <div className="rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <div className="grid gap-4 p-4 grid-cols-12">
              <div className="row-start-1 row-end-2 col-start-1 col-end-13">
                <div className="text-gray-300 row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center px-2">
                  <p>
                    {data?.game?.name}
                  </p>
                  <p className="text-xs">
                    {`Added by : ${data?.game?.creator?.username}`}
                  </p>
                </div>
              </div>
              <div className="row-start-2 row-end-3 col-start-1 col-end-13">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={data?.game?.history[0].track.thumbnail}
                    className="bg-black h-96 w-full object-contain object-center"
                    alt="mol"
                  />
                </div>
              </div>
              <div className="row-start-3 row-end-4 col-start-1 col-end-13">
                <div className="row-start-3 row-end-4 col-start-1 col-end-13 text-gray-300 text-xs flex justify-between px-2">
                  <p className="capitalize">
                    {`Plays : ${data?.game?.playCount}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row-start-3 row-end-4 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="History" />
          </div>
        </div>

        <div className="row-start-4 row-end-5 col-start-1 col-end-13">
          <div className="p-4 space-y-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            {data?.game?.history?.map((round) => (
              <div className="border rounded-lg space-y-4 p-4">
                <p className="w-full text-center text-gray-300 flex justify-center items-center">
                  {`Round : ${round.position} - ${round.track.title}`}
                  <LinkIcon
                    className="h-5 ml-2 cursor-pointer underline text-blue-200"
                    onClick={() => window.open(`${round.track.videoUrl}`, "_blank")}
                  />
                </p>
                <YouTube className="mx-auto rounded-lg overflow-hidden shadow-2xl" videoId={round.track.videoId} />
                {round?.ranks.map((rank) => (
                  <div className="text-white border flex w-min mx-auto">
                    <div className="flex items-center justify-center w-16">
                      {`${rank.position}.`}
                    </div>
                    <div className="flex items-center justify-center">
                      <img
                        className="h-8 object-cover object-center rounded-full"
                        src={`https://cdn.discordapp.com/avatars/${rank.user.discordData.id}/${rank.user.avatar}.jpg`}
                        alt="ok"
                      />
                    </div>
                    <div className="flex items-center pl-4 w-44">
                      {rank.user.username}
                    </div>
                    <div className="flex items-center w-28 pl-4">
                      {`${rank.points} PTS`}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default UserPage;
