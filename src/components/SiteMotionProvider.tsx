import { useEffect, useState, type ReactNode } from 'react';
import { SiteMotionContext } from '../state/useSiteMotion';
export default function SiteMotionProvider({ children }: { children: ReactNode }) {
  const [manualPause, setManualPause] = useState(false);
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const paused = manualPause || systemReduced;
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = paused ? 'paused' : 'full'; }, [paused]);
  return <SiteMotionContext.Provider value={{ paused, systemReduced, toggle: () => setManualPause(value => !value) }}>{children}</SiteMotionContext.Provider>;
}
