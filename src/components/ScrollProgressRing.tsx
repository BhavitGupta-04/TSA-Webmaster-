import { useEffect, useState } from 'react';
import { useSiteMotion } from '../state/site-motion';

export default function ScrollProgressRing() {
  const [progress, setProgress] = useState(0);
  const { paused } = useSiteMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const circumference = 2 * Math.PI * 19;
  const dashOffset = circumference * (1 - progress / 100);
  const returnToTop = () => window.scrollTo({ top: 0, behavior: paused ? 'instant' : 'smooth' });

  return (
    <button className="scroll-progress-ring" type="button" onClick={returnToTop} aria-label={`Page progress ${Math.round(progress)} percent. Return to top`} title="Page progress · back to top">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle className="scroll-ring-track" cx="24" cy="24" r="19" />
        <circle className="scroll-ring-value" cx="24" cy="24" r="19" strokeDasharray={circumference} strokeDashoffset={dashOffset} />
      </svg>
      <span>{Math.round(progress)}<small>%</small></span>
    </button>
  );
}
