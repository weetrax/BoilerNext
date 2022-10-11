import axios, { AxiosError } from "axios";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React, { useEffect, useState } from "react";
import { apiRoutes } from "../routes";
import { IUser, ResponseError } from "../types";

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(apiRoutes.currentuser)
      .then((response) => {
        const u = response.data.user as IUser;
        setUser(u);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = (
    email: string,
    password: string,
    callback: (err?: ResponseError) => void
  ) => {
    axios
      .post(apiRoutes.login, {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data);
        callback();
      })
      .catch((err: AxiosError<any, any>) => {
        callback(err.response?.data);
      });
  };

  const logout = (callback: (err?: ResponseError) => void) => {
    axios
      .get(apiRoutes.logout)
      .then((response) => {
        setUser(null);
        callback();
      })
      .catch((err: AxiosError<any, any>) => {
        callback(err);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, loading, login, logout }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
