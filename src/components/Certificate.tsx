import { Award, Printer, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { lessons } from '../data/portalCurriculum';
import { useProgress } from '../state/useProgress';

/**
 * Shown once every module is complete. Printing uses the browser's own dialog —
 * a print stylesheet hides the rest of the page, so "Save as PDF" produces the
 * certificate on its own with no server involved.
 */
export default function Certificate({ onClose }: { onClose: () => void }) {
  const { displayName, gradeLevel, xp, moduleScores } = useProgress();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const average = Math.round(
    lessons.reduce((sum, lesson) => sum + (moduleScores[lesson.id] ?? 0), 0) / lessons.length
  );
  const issued = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="certificate-overlay" role="dialog" aria-modal="true" aria-label="Certificate of completion">
      <div className="certificate-shell">
        <button ref={closeRef} type="button" className="certificate-close" onClick={onClose} aria-label="Close certificate">
          <X size={19} />
        </button>

        <article className="certificate" id="signal-certificate">
          <div className="certificate-rule" aria-hidden="true" />
          <span className="certificate-seal" aria-hidden="true"><Award size={30} /></span>
          <p className="certificate-kicker">SIGNAL LAB / AI LEARNING PORTAL</p>
          <h2>Certificate of Completion</h2>
          <p className="certificate-presented">This certifies that</p>
          <p className="certificate-name">{displayName}</p>
          <p className="certificate-body">
            has completed all eight lessons across four units of the Signal Lab learning path{gradeLevel ? ` as a grade ${gradeLevel} student` : ''} —
            covering how machine learning works, how to use AI tools deliberately, the ethics of automated decisions, and creative
            work with a human at the centre.
          </p>
          <dl className="certificate-stats">
            <div><dt>Lessons</dt><dd>{lessons.length} of {lessons.length}</dd></div>
            <div><dt>Experience</dt><dd>{xp} XP</dd></div>
            <div><dt>Average quiz score</dt><dd>{average}%</dd></div>
            <div><dt>Issued</dt><dd>{issued}</dd></div>
          </dl>
          <p className="certificate-footnote">
            Awarded by Signal Lab, a student project. This is a record of work finished on this site, not an accredited
            qualification.
          </p>
          <div className="certificate-rule certificate-rule--bottom" aria-hidden="true" />
        </article>

        <div className="certificate-actions">
          <button type="button" className="landing-primary" onClick={() => window.print()}>
            <Printer size={17} /> Print or save as PDF
          </button>
          <button type="button" className="studio-text-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
