import { useEffect, useState } from 'react';
import { ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';

interface Challenge {
  id: string;
  topic: string;
  title: string;
  prompt: string;
  hint: string;
  date?: string;
}

const offlineChallenges: Challenge[] = [
  { id: 'offline-verify', topic: 'CHECK THE EVIDENCE', title: 'The confident answer', prompt: 'An AI gives your lab group a confident explanation and one source. What would you check before using it?', hint: 'Open the original source and compare its evidence with the claim.' },
  { id: 'offline-prompt', topic: 'PROMPT WITH PURPOSE', title: 'The hint, not the answer', prompt: 'Rewrite “help me with algebra” so an AI gives you one useful hint at a time instead of doing the problem for you.', hint: 'Include the topic, your level, and what you want the tool to do after each hint.' },
  { id: 'offline-fairness', topic: 'LOOK FOR FAIRNESS', title: 'Who is missing?', prompt: 'A speech tool works well for most of your class but struggles with some accents. What examples would you add to test it fairly?', hint: 'Think about who uses the tool and whose speech may be missing from its examples.' },
];

export default function DailyChallenge() {
  const [offset, setOffset] = useState(0);
  const [challenge, setChallenge] = useState(offlineChallenges[0]);
  const [apiConnected, setApiConnected] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fallback = offlineChallenges[offset % offlineChallenges.length];
    setChallenge(fallback);
    setApiConnected(false);
    setShowHint(false);

    const apiBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
    fetch(`${apiBase}/api/v1/challenge/?offset=${offset}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Challenge API unavailable');
        return response.json() as Promise<Challenge>;
      })
      .then((data) => {
        if (data.id && data.prompt && data.hint) {
          setChallenge(data);
          setApiConnected(true);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setChallenge(fallback);
      });

    return () => controller.abort();
  }, [offset]);

  return (
    <section className="daily-challenge landing-width" aria-labelledby="daily-challenge-title">
      <div className="daily-challenge-heading">
        <span className="daily-challenge-icon"><Lightbulb size={23} /></span>
        <div><p className="reference-eyebrow">A SMALL QUESTION. A BIGGER IDEA.</p><h2 id="daily-challenge-title">Try a field challenge.</h2></div>
        <span className="daily-challenge-source">{apiConnected ? 'DJANGO · DAILY ROTATION' : 'FIELD NOTES · OFFLINE READY'}</span>
      </div>
      <div className="daily-challenge-content" aria-live="polite">
        <div><p className="daily-challenge-topic">{challenge.topic}</p><h3>{challenge.title}</h3><p>{challenge.prompt}</p></div>
        {showHint && <p className="daily-challenge-hint"><strong>Consider:</strong> {challenge.hint}</p>}
      </div>
      <div className="daily-challenge-actions">
        <button className="daily-challenge-next" type="button" onClick={() => setOffset((current) => current + 1)}><RefreshCw size={15} /> New challenge</button>
        <button className="daily-challenge-hint-button" type="button" aria-expanded={showHint} onClick={() => setShowHint((shown) => !shown)}>{showHint ? 'Hide hint' : 'Show a hint'} <ArrowRight size={15} /></button>
      </div>
    </section>
  );
}
