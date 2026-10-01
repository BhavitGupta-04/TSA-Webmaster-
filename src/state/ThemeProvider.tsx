import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeContext, type ThemeChoice } from './theme-context';

const THEME_KEY = 'signal-lab-theme';

function systemPrefersDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readSaved(): ThemeChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [chosen, setChosen] = useState<ThemeChoice | null>(readSaved);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  // Follow the operating system until the visitor picks for themselves.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme: ThemeChoice = chosen ?? (systemDark ? 'dark' : 'light');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#13201a' : '#2f5f4a');
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      followsSystem: chosen === null,
      toggle: () => {
        const next: ThemeChoice = theme === 'dark' ? 'light' : 'dark';
        setChosen(next);
        try {
          window.localStorage.setItem(THEME_KEY, next);
        } catch {
          // A browser with storage blocked still gets the theme for this visit.
        }
      },
    }),
    [theme, chosen]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
