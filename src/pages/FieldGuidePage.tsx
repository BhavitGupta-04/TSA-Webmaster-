import { useState } from 'react';
import { ArrowRight, BadgeCheck, BookOpenCheck, Eye, Fingerprint, MessageSquareText, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';

const fieldRules = [
  { number: '01', icon: MessageSquareText, title: 'Say what you actually need', subtitle: 'PROMPT WITH PURPOSE', text: 'Give the tool a task, useful context, and a format. For studying, ask for hints or practice questions instead of a finished assignment.', example: '“Quiz me on cellular respiration, one question at a time. Wait for my answer before explaining.”' },
  { number: '02', icon: Eye, title: 'Treat output like a draft', subtitle: 'VERIFY THE IMPORTANT PARTS', text: 'Check facts, quotes, calculations, and citations against reliable sources. A convincing tone is not proof, and a link is only a starting point.', example: 'Open the original source. Does it really say what the AI claims it says?' },
  { number: '03', icon: Fingerprint, title: 'Keep private information private', subtitle: 'PROTECT PEOPLE', text: 'Do not paste passwords, private messages, student records, or personal details into a tool unless you have a clear reason and permission.', example: 'Use fictional details when testing a prompt or demonstrating an idea.' },
  { number: '04', icon: BadgeCheck, title: 'Own your process', subtitle: 'BE HONEST ABOUT AI HELP', text: 'Follow your teacher’s rules. Keep track of where AI helped, what you changed, and which ideas are yours.', example: '“AI suggested three outlines. I checked the sources and wrote the final explanation.”' },
  { number: '05', icon: ShieldAlert, title: 'Ask who could be left out', subtitle: 'LOOK FOR FAIRNESS', text: 'AI can repeat patterns in its data. Consider whose examples are missing and whether the tool works equally well for the people affected.', example: 'Would a speech tool understand different accents? What evidence would you need?' },
];

export default function FieldGuidePage() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="signal-landing public-interior studio-interior">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="studio-page-hero">
          <div className="landing-width">
            <p className="landing-kicker"><span /> THE STUDENT FIELD GUIDE</p>
            <h1>Use AI like a tool.<br /><em>Think like the expert.</em></h1>
            <p>A five-point check for using AI in school without losing your judgment, privacy, or voice.</p>
            <a className="landing-primary" href="#field-rules">Open the checklist <ArrowRight size={18} /></a>
          </div>
        </section>

        <section className="field-guide-layout landing-width" id="field-rules" tabIndex={-1}>
          <aside className="field-guide-aside"><p className="landing-kicker landing-kicker--dark">BEFORE YOU HIT SUBMIT</p><h2>Pause for<br /><em>one minute.</em></h2><p>Run through these checks before using AI output in an assignment, project, or decision.</p><div className="field-guide-callout"><BookOpenCheck size={18} /><span>AI can support learning. It cannot do your learning for you.</span></div><div className="studio-checklist-progress"><p role="status">{checked.length} of 5 checks complete</p><progress value={checked.length} max={5} aria-label="Field guide checks completed" /><button type="button" onClick={() => setChecked([])}>Reset checklist</button></div></aside>
          <div className="field-rule-list">{fieldRules.map(({ number, icon: Icon, title, subtitle, text, example }) => <article className={`field-rule ${checked.includes(number) ? "is-checked" : ""}`} key={number}><div className="field-rule-icon"><Icon size={20} /></div><div className="field-rule-content"><div className="field-rule-meta"><span>{number}</span><span>{subtitle}</span></div><h3>{title}</h3><p>{text}</p><div className="field-rule-example"><span>TRY THIS</span>{example}</div><label className="studio-check-item"><input type="checkbox" checked={checked.includes(number)} onChange={() => setChecked(current => current.includes(number) ? current.filter(item => item !== number) : [...current, number])} />I have considered this check</label></div></article>)}</div>
        </section>

        <section className="field-guide-end"><div className="landing-width"><p className="landing-kicker">READY TO PRACTICE?</p><h2>Put good judgment into action.</h2><p>Explore lessons, run a mini experiment, and earn progress as you build your AI skills.</p><Link className="landing-primary" to="/learn">Go to the learning studio <ArrowRight size={18} /></Link></div></section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}


