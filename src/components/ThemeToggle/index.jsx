import { memo, useCallback, useState, useEffect } from 'react';

const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState(null);

  const handleClick = useCallback(() => {
    setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
    setTheme(storedTheme || systemTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle(THEME_DARK, theme === THEME_DARK);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <button
      onClick={handleClick}
      className={`
        text-sm font-bold p-2 rounded-md bg-background transition 
        dark:bg-background dark:text-foreground
      `}
    >
      {theme === THEME_DARK ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
});

export default ThemeToggle;
