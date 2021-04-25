import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import { format } from "date-fns";
import Nav from "../../../components/Nav";
import Title from "../../../components/Title";
import Footer from "../../../components/Footer";
import DeleteGameButton from "../../../components/DeleteGameButton";
import GAME from "../../../graphql/games/game";
import WaitingScreen from "../../../components/WaitingScreen";

const getPoints = (number) => {
  if (number === 1) {
    return 35;
  } if (number === 2) {
    return 25;
  } if (number === 3) {
    return 20;
  }
  return 10;
};

function PlaylistPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GAME, { variables: { id } });

  if (loading) {
    return <WaitingScreen />;
  }

  if (error) {
    return null;
  }

  if (data) {
    return (
      <>
        <Nav />
        <div className="bg-hero-endless-clouds bg-gray-900 pt-4">
          <div className="mb-4 max-w-7xl mx-auto grid-col-2 grid">
            <div className="col-start-1 col-end-2">
              <Title back title={`${data?.game?.name} - ${format(data?.game?.createdAt, "dd/MM/yyyy HH:mm:ss")}`} />
            </div>
            <div className="col-start-2 col-end-3">
              <DeleteGameButton id={id} />
            </div>
          </div>
          {data?.game?.history.map((round) => (
            <>
              <div className="w-full">
                <p className="text-center text-white truncate py-4">
                  {`Round ${round.position} - ${round.song.title}`}
                </p>
                <div className="max-w-7xl mx-auto">
                  <YouTube
                    containerClassName="max-w-7xl mx-auto"
                    className="w-full"
                    videoId={round.song.url.replace("https://www.youtube.com/watch?v=", "")}
                  />
                </div>
              </div>
              <div className="border-b border-pink-500">
                {round.rank.length <= 0 && <p className="text-center text-white truncate py-4">No responses</p>}
                {round.rank.length > 0 && round.rank.map((r) => (
                  <p className="text-center text-white truncate py-4">
                    {`Position ${r.position} - ${r.player.username} - ${r.points} (${getPoints(r.position)} + ${r.points - getPoints(r.position)} (seconds remaining)`}
                  </p>
                ))}
              </div>
            </>
          ))}
        </div>
        <Footer />
      </>
    );
  }
}

export default PlaylistPage;
