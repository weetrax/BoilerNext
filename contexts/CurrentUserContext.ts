import React from "react";
import { IUser } from "./../lib/database/models/User";

type CurrentUserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
};

const CurrentUserContext = React.createContext<CurrentUserContextType>({
  user: null,
  setUser: () => {},
});

export default CurrentUserContext;
