import { ThemeEnum } from "../types";

export const getLocalStorageTheme = (): ThemeEnum => {
    let theme: ThemeEnum = ThemeEnum.dark;
    if (typeof window !== "undefined") {
        theme = window.localStorage.getItem("theme") ? window.localStorage.getItem("theme") as ThemeEnum : ThemeEnum.dark;
    }
    return theme;
}

export const setLocalStorageTheme = (value: ThemeEnum): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", value.toString())
    }
}