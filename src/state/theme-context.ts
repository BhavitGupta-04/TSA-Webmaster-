import { createContext } from 'react';

export type ThemeChoice = 'light' | 'dark';

export interface ThemeState {
  theme: ThemeChoice;
  /** True while the visitor has not chosen, so we follow the operating system. */
  followsSystem: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeState | null>(null);
