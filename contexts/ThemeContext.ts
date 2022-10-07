import React from 'react';
import { getLocalStorageTheme } from '../tools/theme';
import { LanguageCode } from '../types';

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
    languageCode: LanguageCode;
    setLanguageCode: (lang: LanguageCode) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: getLocalStorageTheme(),
    toggleTheme: () => { },
    languageCode: "en",
    setLanguageCode: () => { }
})

export default ThemeContext;