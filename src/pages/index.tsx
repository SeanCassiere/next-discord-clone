import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import MarketingNavbar from "../components/marketing/navbar";

const Home: NextPage = () => {
  const { status, data: session } = useSession();
  return (
    <>
      <Head>
        <title>Discord Clone</title>
      </Head>

      <main className="max-h-screen overflow-y-scroll">
        <header className="bg-blue-700 h-72">
          <MarketingNavbar />
        </header>
        <div className="container mx-auto flex flex-col items-center justify-center p-4">
          {status !== "loading" && status === "authenticated" && (
            <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
              <button type="button" onClick={() => signOut()}>
                Logout
              </button>
            </div>
          )}
          {status !== "loading" && status === "authenticated" && (
            <div>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
