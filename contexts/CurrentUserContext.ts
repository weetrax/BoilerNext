import React from "react";
import { IUser, ResponseError } from "../types";

type CurrentUserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (
    email: string,
    password: string,
    callback: (err?: ResponseError) => void
  ) => void;
  logout: (callback: (err?: ResponseError) => void) => void;
  loading: boolean;
};

const CurrentUserContext = React.createContext<CurrentUserContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  loading: true,
});

export default CurrentUserContext;
