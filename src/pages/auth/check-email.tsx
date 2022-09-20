import React from "react";
import Head from "next/head";
import Link from "next/link";

const CheckEmailPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Check Email</title>
      </Head>
      <main className="w-full min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-discordgray-900 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-100">Check your email</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-discordgray-700 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <p className="text-base">You have been sent an email with a link to sign-in.</p>
            <p className="text-base mt-4 text-center">
              <Link href="/">
                <a className="text-slate-300 hover:text-slate-100 transition-all duration-150">Go back home</a>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default CheckEmailPage;
