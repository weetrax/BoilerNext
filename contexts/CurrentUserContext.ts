import React from "react";
import { ResponseError } from "../types";
import { IUser } from "./../lib/database/models/User";

type CurrentUserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: (callback: (err?: ResponseError) => void) => void;
  loading: boolean;
};

const CurrentUserContext = React.createContext<CurrentUserContextType>({
  user: null,
  setUser: () => { },
  logout: () => { },
  loading: true,
});

export default CurrentUserContext;
