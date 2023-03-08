import React, { useEffect, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { getLocalStorageTheme, setLocalStorageTheme } from "../tools/theme";
import { ThemeEnum } from "../types";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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
