import { createContext, useContext } from 'react';
export const SiteMotionContext = createContext({ paused: false, systemReduced: false, toggle: () => {} });
export const useSiteMotion = () => useContext(SiteMotionContext);
