import getAlbums from "@/utils/api";
import ClientWrapper from "./components/ClientWrapper";



export default async function Home() {
  const data = await getAlbums(); 

  return (
    <main className="main-container">
      <ClientWrapper data={data} />
    </main>
  );
}