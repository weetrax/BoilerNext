import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
