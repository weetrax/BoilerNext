import axios from 'axios';
import Container from '../components/_Layout/Container';
import Head from 'next/head';
import InputText from '../components/_Layout/Controls/InputText';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import { lang } from '../constants/lang';
import type { NextPage } from "next";

const Home: NextPage = () => {
  /* States */
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const toastRegister = toast.loading(lang.registerLoading.fr)
    setLoading(true);
    axios
      .post("/api/auth/register", {
        username,
        email,
        city,
        country,
        password,
        passwordConfirm: passwordConfirm,
      })
      .then((response) => {
        toast.success(lang.registerOK.fr, {
          id: toastRegister
        })
      })
      .catch((err) => {
        toast.error(JSON.stringify(err), {
          id: toastRegister
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Head>
        <title>BoilerNext - {lang.createAccount.fr}</title>
        <meta
          name="description"
          content="BoilerNext - A NextJS - Tailwind - Typescript Boilerplate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="my-8">
          <div className="bg-white dark:bg-dark-600 max-w-3xl mx-auto flex flex-col gap-6 items-center border border-gray-300 dark:border-dark-700 py-12">
            <h1 className="text-2xl font-bold">{lang.createAccount.fr}</h1>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 w-full px-12"
            >
              <div className="col-span-2">
                <label className="block mb-1 font-semibold" htmlFor="username">
                  {lang.username.fr}
                </label>
                <InputText
                  type={"text"}
                  value={username}
                  required
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  additionnalClassname="w-full"
                />
              </div>
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

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-1 font-semibold" htmlFor="city">
                  {lang.city.fr}
                </label>
                <InputText
                  type={"text"}
                  value={city}
                  name="city"
                  id="city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                  additionnalClassname="w-full"
                ></InputText>
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block mb-1 font-semibold" htmlFor="country">
                  {lang.country.fr}
                </label>
                <InputText
                  type={"text"}
                  value={country}
                  name="country"
                  additionnalClassname="w-full"
                  id="country"
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></InputText>
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
              <div className="col-span-2">
                <label className="block mb-1 font-semibold" htmlFor="username">
                  {lang.passwordConfirm.fr}
                </label>
                <InputText
                  type={"password"}
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  additionnalClassname="w-full"
                />

                {password !== passwordConfirm && (
                  <p className="text-red-500">
                    {
                      lang.passwordNotMatch.fr
                    }
                  </p>
                )}
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  className="px-3 py-2 rounded-xl bg-primary-500 text-white"
                  type={"submit"}
                >
                  {lang.register.fr} {loading && <>...</>}
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
