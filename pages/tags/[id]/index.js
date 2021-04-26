/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-undef */
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Layout from "../../../layout/Layout";
import Title from "../../../components/Title";
import TAG from "../../../graphql/tags/tag";

function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(TAG, { variables: { id } });

  return (
    <Layout>
      <div className="grid gap-4 p-4 grid-cols-12 max-w-7xl mx-auto">
        <div className="row-start-1 row-end-2 col-start-1 col-end-13">
          <div className="p-4 rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <Title title="Tag" />
          </div>
        </div>
        <div className="row-start-2 row-end-3 col-start-1 col-end-13">
          <div className="rounded-lg border-b border-pink-500 bg-gray-700 bg-hero-endless-clouds">
            <div className="grid gap-4 p-4 grid-cols-12">
              <div className="row-start-1 row-end-2 col-start-1 col-end-13">
                <div className="text-gray-300 row-start-1 row-end-2 col-start-1 col-end-13 flex justify-between items-center px-2">
                  <p>
                    {data?.tag?.name}
                  </p>
                  <p className="text-xs">
                    {`Added by : ${data?.tag?.creator?.username}`}
                  </p>
                </div>
              </div>
              <div className="row-start-2 row-end-3 col-start-1 col-end-13">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={data?.tag?.thumbnail}
                    className="bg-black h-96 w-full object-contain object-center"
                    alt="mol"
                  />
                </div>
              </div>
              <div className="row-start-3 row-end-4 col-start-1 col-end-13">
                <div className="row-start-3 row-end-4 col-start-1 col-end-13 text-gray-300 text-xs flex justify-between px-2">
                  <p className="capitalize">
                    {`Plays : ${data?.tag?.playCount}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
