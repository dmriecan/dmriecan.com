"use client";
import React from "react";

export const enum Theme {
  dark = "dark",
  light = "light",
  system = "system"
}

export const initialTheme = Theme.light;

const storeKey = "theme";

const saveTheme = (theme: Theme) => {
  localStorage.setItem(storeKey, theme);
};

const loadSavedThemeOrDefault = () => typeof window !== "undefined"
    ? localStorage.getItem(storeKey) as Theme || initialTheme
    : initialTheme;

const applyThemeToHTML = (theme: Theme.dark | Theme.light) => {
  if (theme === Theme.dark) {
    document.body.classList.replace(Theme.light, theme);
  } else {
    document.body.classList.replace(Theme.dark, theme);
  }
};

const ThemeContext = React.createContext<
  [Theme, React.Dispatch<React.SetStateAction<Theme>>] | undefined
>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = React.useState(loadSavedThemeOrDefault);
  const mediaQuery = React.useRef<MediaQueryList>();

  React.useEffect(() => {
    mediaQuery.current = matchMedia("(prefers-color-scheme: dark)");
    saveTheme(theme);

    if (theme === Theme.system) {
      const applySystemThemeToHTML = () => {
        const systemTheme = mediaQuery.current?.matches ? Theme.dark : Theme.light;
        applyThemeToHTML(systemTheme);
      };
      applySystemThemeToHTML();

      mediaQuery.current.addEventListener("change", applySystemThemeToHTML);
      return () => {
        mediaQuery.current?.removeEventListener("change", applySystemThemeToHTML);
      };
    }
    applyThemeToHTML(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme() must be called within ThemeProvider.");
  }
  return context;
};
