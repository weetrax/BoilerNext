import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getLocalStorageTheme, setLocalStorageTheme } from "../tools/theme";
import { ThemeEnum } from "../types";

type ThemeContextType = {
  theme: ThemeEnum;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
  theme: getLocalStorageTheme(),
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeEnum>(getLocalStorageTheme());
  const [mounted, setMounted] = useState(false);

  const toggleTheme = () => {
    const value = theme === ThemeEnum.dark ? ThemeEnum.light : ThemeEnum.dark;
    setTheme(value);
    setLocalStorageTheme(value);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
