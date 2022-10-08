import CurrentUserContext from "../contexts/CurrentUserContext";
import React, { useEffect, useState } from "react";
import { IUser } from "../lib/database/models/User";

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
