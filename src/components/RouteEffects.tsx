import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const titles: Record<string, string> = { '/': 'Home', '/curriculum': 'Our Curriculum', '/about': 'About Signal Lab', '/contact': 'Contact Signal Lab', '/playground': 'Playground', '/resources': 'Resource Library', '/field-guide': 'Student Field Guide', '/signup': 'Create a Profile', '/portal': 'My Learning', '/learn': 'Learning Studio', '/progress': 'Your Progress' };
export default function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `${titles[pathname] ?? (pathname.startsWith('/learn/') && pathname.endsWith('/quiz') ? 'Lesson Quiz' : 'Home')} | Signal Lab`;
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
