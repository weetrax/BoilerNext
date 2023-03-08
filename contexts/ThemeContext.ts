import React from 'react';
import { getLocalStorageTheme } from '../tools/theme';
import { ThemeEnum } from '../types';

type ThemeContextType = {
    theme: ThemeEnum;
    toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: getLocalStorageTheme(),
    toggleTheme: () => { },
})

export default ThemeContext;