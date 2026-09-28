import { useEffect, useRef, type ReactNode } from 'react';
import { useSiteMotion } from '../state/useSiteMotion';
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { paused } = useSiteMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || paused || !('IntersectionObserver' in window)) return;
    element.classList.add('reveal-pending');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.remove('reveal-pending'); observer.disconnect(); }
    }, { threshold: .08 });
    observer.observe(element);
    return () => { observer.disconnect(); element.classList.remove('reveal-pending'); };
  }, [paused]);
  return <div ref={ref} className={`studio-reveal ${className}`}>{children}</div>;
}
