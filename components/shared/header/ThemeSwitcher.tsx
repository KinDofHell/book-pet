"use client";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import ThemeContext from "@/contexts/ThemeContext";

const ThemeSwitcher = () => {
  const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
    useContext(ThemeContext);

  const toggleThemeHandler = (): void => {
    themeCtx.toggleThemeHandler();
  };

  return (
    <Button
      className="w-[50px] h-[26px] bg-white rounded-[17px] hover:bg-white tumble before:bg-black before:left-0.5 dark:before:right-0.5 dark:before:left-auto dark:before:bg-white dark:bg-black"
      onClick={toggleThemeHandler}
    ></Button>
  );
};
export default ThemeSwitcher;
