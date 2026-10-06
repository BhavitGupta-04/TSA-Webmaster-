import { createContext, useContext } from 'react';

export const SiteMotionContext = createContext({ paused: false });
export const useSiteMotion = () => useContext(SiteMotionContext);
