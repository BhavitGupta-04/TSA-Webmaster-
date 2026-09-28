import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const titles: Record<string, string> = { '/': 'Explore AI', '/about': 'Our Story', '/playground': 'Playground', '/resources': 'Resource Library', '/field-guide': 'Student Field Guide', '/signup': 'Create a Profile', '/portal': 'My Learning', '/learn': 'Learning Studio', '/progress': 'Your Progress' };
export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `${titles[pathname] ?? 'Explore AI'} | Signal Lab`;
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const target = document.getElementById(hash.slice(1));
        target?.scrollIntoView({ block: 'start' });
        target?.focus({ preventScroll: true });
      } else window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
