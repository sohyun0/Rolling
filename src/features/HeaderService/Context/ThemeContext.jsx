import { createContext, useEffect, useState } from "react";
import { THEME } from "../../../constants/theme";

export const ThemeContext = createContext("light");

/**
 * 테마 상태를 모든 컴포넌트에 전달하기 위한 컨텍스트 제공 컴포넌트
 * @author hwitae
 * @param {React.ReactNode} children
 * @returns {theme, toggleTheme}
 */
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem(THEME.key));

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      localStorage.setItem(THEME.key, THEME.darkMode);
      document.documentElement.classList.add(THEME.darkMode);
    } else {
      localStorage.setItem(THEME.key, THEME.lightMode);
      document.documentElement.classList.remove(THEME.darkMode);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
