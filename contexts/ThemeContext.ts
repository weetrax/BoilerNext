import React from "react";
import { getLocalStorageTheme } from "../tools/theme";

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: getLocalStorageTheme(),
    toggleTheme: () => { }
})

export default ThemeContext;