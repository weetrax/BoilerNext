import axios, { AxiosError } from 'axios';
import Container from '../components/_Layout/Container';
import Head from 'next/head';
import InputText from '../components/_Layout/Controls/InputText';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { lang } from '../constants/lang';
import type { NextPage } from "next";

const Home: NextPage = () => {
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
    })
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        toast.success(lang.loginOK.fr, {
          id: toastLogin
        })
        console.log(response.data)
      })
      .catch((err: AxiosError<any, any>) => {
        toast.error(err.response?.data.message, {
          id: toastLogin
        });
        setError(err.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      <Container>
        <div className="my-8">
          <div className="bg-white dark:bg-dark-600 max-w-3xl mx-auto flex flex-col gap-6 items-center border border-gray-300 dark:border-dark-700 py-12">
            <h1 className="text-2xl font-bold">{lang.login.fr}</h1>
            <form
              onChange={() => setError(null)}
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 w-full px-12"
            >
              <div className="col-span-2">
                <label className="block mb-1 font-semibold" htmlFor="email">
                  {lang.email.fr}
                </label>
                <InputText
                  type={"email"}
                  value={email}
                  required
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  additionnalClassname="w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-semibold" htmlFor="password">
                  {lang.password.fr}
                </label>
                <InputText
                  type={"password"}
                  value={password}
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  additionnalClassname="w-full"
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  className="px-3 py-2 rounded-xl bg-primary-500 text-white"
                  type={"submit"}
                >
                  {lang.login.fr} {loading && <>...</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
