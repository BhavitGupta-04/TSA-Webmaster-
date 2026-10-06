import { useEffect, useState, type ReactNode } from 'react';
import { SiteMotionContext } from '../state/site-motion';

export default function SiteMotionProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = systemReduced ? 'paused' : 'full'; }, [systemReduced]);
  return <SiteMotionContext.Provider value={{ paused: systemReduced }}>{children}</SiteMotionContext.Provider>;
}
