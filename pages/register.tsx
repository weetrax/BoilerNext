import axios, { AxiosError } from "axios";
import Button from "../components/_Layout/Controls/Button";
import countriesJson from "../constants/countries.json";
import Head from "next/head";
import InputText from "../components/_Layout/Controls/InputText";
import Link from "next/link";
import Router from "next/router";
import SelectCountry from "../components/_Layout/Controls/SelectCountry";
import toast from "react-hot-toast";
import { apiRoutes, routes } from "../routes";
import { FormEvent, useState } from "react";
import { ironOptions } from "../lib/session";
import { IUser, ResponseError, SelectCountryOption } from "../types";
import { lang } from "../constants/lang";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";

enum StepEnum {
  INFO = 1,
  MORE = 2,
  VERIF = 3,
}

const Register: NextPage = () => {
  /* Hooks */
  const { user, setUser } = useCurrentUser();

  /* States */
  const [step, setStep] = useState<number>(StepEnum.INFO);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  /* Default France Country */
  const [country, setCountry] = useState<SelectCountryOption | undefined>(
    countriesJson.find((x) => x.code.toUpperCase() === "FR")
      ? {
          label: countriesJson.find((x) => x.code.toUpperCase() === "FR")
            ?.name!!,
          value: countriesJson.find((x) => x.code.toUpperCase() === "FR")
            ?.code!!,
          plainObject: countriesJson.find(
            (x) => x.code.toUpperCase() === "FR"
          )!!,
        }
      : undefined
  );
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [tel, setTel] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (
    e: FormEvent,
    callback: (user: IUser | null, err?: ResponseError) => void
  ) => {
    e.preventDefault();
    const toastRegister = toast.loading(lang.registerLoading.fr);
    setLoading(true);
    axios
      .post(apiRoutes.register, {
        username,
        email,
        password,
        passwordConfirm: passwordConfirm,
        country: country?.plainObject,
        city,
        zipCode,
        tel,
      })
      .then((response) => {
        toast.success(lang.registerOK.fr, {
          id: toastRegister,
        });
        callback(response.data, undefined);
      })
      .catch((err: AxiosError<any, any>) => {
        toast.error(err.response?.data.message, {
          id: toastRegister,
        });
        callback(null, err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user) Router.push(routes.home);

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
              <h2 className="text-3xl font-extrabold">{lang.register.fr}</h2>
              <p>
                Inscrivez-vous pour profiter de toutes nos fonctionnalités !{" "}
                <Link href={routes.login}>
                  <a className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200 ease-in-out">
                    {lang.alreadyHaveAccount.fr}
                  </a>
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                {step === StepEnum.INFO ? (
                  <Step1
                    step={step}
                    setStep={setStep}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                  />
                ) : (
                  step === StepEnum.MORE && (
                    <Step2
                      step={step}
                      setStep={setStep}
                      country={country}
                      setCountry={setCountry}
                      city={city}
                      setCity={setCity}
                      zipCode={zipCode}
                      setZipcode={setZipCode}
                      tel={tel}
                      setTel={setTel}
                      formHandler={handleSubmit}
                      setUser={setUser}
                    />
                  )
                )}
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

type StepProps = {
  step: number;
  setStep: (step: number) => void;
};

interface Step1Props extends StepProps {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const Step1: React.FC<Step1Props> = ({
  step,
  setStep,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    //Check email validity
    axios
      .get(apiRoutes.checkunicity, {
        params: {
          username,
          email,
        },
      })
      .then((response) => {
        setStep(step + 1);
      })
      .catch((err: AxiosError<any, any>) => {
        toast.error(err.response?.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        type={"text"}
        value={username}
        required
        label={lang.username.fr}
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
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
          <Link href={routes.login}>
            <a className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-200 ease-in-out">
              {lang.alreadyHaveAccount.fr}
            </a>
          </Link>
        </div>
      </div>

      <div>
        <Button disabled={loading} type={"submit"}>
          {loading ? lang.registerLoading.fr : lang.register.fr}
        </Button>
      </div>
    </form>
  );
};

interface Step2Props extends StepProps {
  country: SelectCountryOption | undefined;
  setCountry: (country: SelectCountryOption) => void;
  city: string;
  setCity: (city: string) => void;
  zipCode: string;
  setZipcode: (zipCode: string) => void;
  tel: string;
  setTel: (tel: string) => void;
  formHandler: (
    e: FormEvent,
    callback: (user: IUser | null, err?: ResponseError) => void
  ) => void;
  setUser: (user: IUser | null) => void;
}

const Step2: React.FC<Step2Props> = ({
  city,
  setCity,
  country,
  setCountry,
  zipCode,
  setZipcode,
  tel,
  setTel,
  formHandler,
  setUser,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    formHandler(e, (user, err) => {
      setLoading(false);
      setUser(user);
    });
  };

  return (
    <>
      <form
        onChange={() => setError(null)}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <SelectCountry
          onChange={(option: any) => setCountry(option)}
          value={country}
        />
        <InputText
          type={"text"}
          value={city}
          required
          label={lang.city.fr}
          name="city"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          additionnalClassname="w-full"
        />
        <InputText
          type={"text"}
          value={zipCode}
          required
          label={lang.zipCode.fr}
          name="zipCode"
          id="zipCode"
          onChange={(e) => setZipcode(e.target.value)}
          additionnalClassname="w-full"
        />
        <InputText
          type={"tel"}
          value={tel}
          required
          label={lang.tel.fr}
          name="tel"
          id="tel"
          onChange={(e) => setTel(e.target.value)}
          additionnalClassname="w-full"
        />

        <div>
          <Button type={"submit"} disabled={loading}>
            {loading ? lang.validating.fr : lang.validate.fr}
          </Button>
        </div>
      </form>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    if (user !== undefined) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        //user: req.session.user,
      },
    };
  },
  ironOptions
);

export default Register;
