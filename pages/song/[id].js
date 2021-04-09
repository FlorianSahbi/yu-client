// import { useRouter } from 'next/router';
// import { useQuery, gql } from "@apollo/client";
// import ClientOnly from "../../components/ClientOnly";
// import Nav from "../../components/Nav";
// import Footer from "../../components/Footer";
// import YouTube from "react-youtube";
// import UpdateSong from '../../forms/UpdateSong';

// const QUERY = gql`
//   query Song($id: ID) {
//     song(id: $id) {
//       _id
//       title
//       cover
//       url
//     }
//   }
// `;

function SongPage() {
//   const router = useRouter()
//   const { id } = router.query
//   console.log(id)
//   const { data, loading, error } = useQuery(QUERY, { variables: { id } });

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (error) {
//     console.error(error);
//     return null;
//   }
return <p>ok</p>
  // return data ? (
  //   <div className="bg-gray-900">
  //     <p>ok</p>
  //     {/* <ClientOnly>
  //       <Nav />
  //       <div className="flex justify-center">
  //         <main className="inline-block p-4 bg-gray-700 m-10 rounded-lg border-b-4 border-pink-500">
  //           <YouTube
  //             videoId={data?.song?.url.replace("https://www.youtube.com/watch?v=", "")}
  //           />
  //         </main>
  //       </div>
  //       {/* <UpdateSong id={id} /> */}
  //       {/* <Footer /> */}
  //     {/* </ClientOnly> */} */}
  //   </div>
  // ) : {}
}

export default SongPage;
