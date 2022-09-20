import React from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getProviders, getCsrfToken, ClientSafeProvider, signIn } from "next-auth/react";
import Input from "../../web/components/app/form/Input";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      providers: providers,
      csrfToken: csrfToken ?? null,
    },
  };
};

const SignInPage = ({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const providersWithoutEmail = Object.values(providers)
    .filter((prov) => {
      const provider = prov as unknown as ClientSafeProvider;
      return provider.name !== "Email";
    })
    .map((p) => p as ClientSafeProvider);

  return (
    <React.Fragment>
      <Head>
        <title>Sign in</title>
      </Head>
      <main className="w-full min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-discordgray-900 text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-100">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-discordgray-700 pt-4 pb-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            {Object.values(providers).map((prov) => {
              const provider = prov as unknown as ClientSafeProvider;
              if (provider.type !== "email") return null;
              return (
                <form
                  key={provider.type + " " + provider.name}
                  className="space-y-6"
                  action={provider.signinUrl}
                  method="POST"
                >
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <Input label="Email" type="email" required id="email" name="email" placeholder="you@example.com" />

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in with Email
                    </button>
                  </div>
                </form>
              );
            })}

            {providersWithoutEmail.length > 0 && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-discordgray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-discordgray-800 white text-gray-200">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {providersWithoutEmail.map((provider) => (
                    <button
                      key={provider.type}
                      type="button"
                      onClick={() => signIn(provider.id)}
                      className="bg-red-500 hover:bg-red-600 focus:bg-red-600 p-2 rounded text-sm"
                    >
                      Sign in with {provider.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default SignInPage;
