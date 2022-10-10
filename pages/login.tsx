import axios, { AxiosError } from 'axios';
import Head from 'next/head';
import InputText from '../components/_Layout/Controls/InputText';
import Link from 'next/link';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { apiRoutes, routes } from '../routes';
import { FormEvent, useState } from 'react';
import { ironOptions } from '../lib/session';
import { lang } from '../constants/lang';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { withIronSessionSsr } from 'iron-session/next';
import type { NextPage } from "next";

const Home: NextPage = () => {
  /* Hooks */
  const { user, setUser } = useCurrentUser();

  /* States */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /* Loading & Error State */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastLogin = toast.loading(lang.loginLoading.fr, {
      //id: "toastLogin"
    });
    axios
      .post(apiRoutes.login, {
        email,
        password,
      })
      .then((response) => {
        toast.success(lang.loginOK.fr, {
          id: toastLogin,
        });
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err: AxiosError<any, any>) => {
        toast.error(err.response?.data.message, {
          id: toastLogin,
        });
        setError(err.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user) Router.push(routes.home)

  return (
    <div>
      <Head>
        <title>BoilerNext - {lang.login.fr}</title>
        <meta
          name="description"
          content="BoilerNext - A NextJS - Tailwind - Typescript Boilerplate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-main flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center md:text-left">
              {user && <h1>Vous êtes connecter en tant que {user.username}</h1>}
              <h2 className="text-3xl font-extrabold">{lang.login.fr}</h2>
              <p>
                Connectez-vous pour profiter de toutes nos fonctionnalités !{" "}
                <Link href={routes.register}>
                  <a className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200 ease-in-out">
                    {lang.doesntHaveAccount.fr}
                  </a>
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  onChange={() => setError(null)}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <InputText
                    type={"email"}
                    value={email}
                    required
                    label={lang.email.fr}
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    additionnalClassname="w-full"
                  />
                  <InputText
                    type={"password"}
                    value={password}
                    label={lang.password.fr}
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    additionnalClassname="w-full"
                  />

                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200 ease-in-out"
                      >
                        {lang.forgotPassword.fr}
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      className="px-3 py-2 rounded-xl bg-primary-500 hover:bg-primary-400 text-white w-full transition-colors duration-200 ease-in-out"
                      type={"submit"}
                    >
                      {lang.login.fr} {loading && <>...</>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    console.log(req.session)
    const user = req.session.user;

    if (user !== undefined) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      };
    }

    return {
      props: {
        //user: req.session.user,
      },
    };
  },
  ironOptions,
);

export default Home;