import { LanguageCode } from "../types";

export const getLocalStorageTheme = (): "light" | "dark" => {
    let theme: "light" | "dark" = "light";
    if (typeof window !== "undefined") {
        theme = window.localStorage.getItem("theme") as "light" | "dark" ?? "light";
    }
    return theme;
}

export const setLocalStorageTheme = (value: "light" | "dark"): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem("theme", value)
    }
}

export const getLocalStorageLang = (): LanguageCode => {
    let code: LanguageCode = "en";
    if (typeof window !== "undefined") {
        code = window.localStorage.getItem("lang") as LanguageCode ?? "en";
    }
    return code;
}