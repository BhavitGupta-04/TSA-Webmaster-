import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BrainCircuit, Check, Clock3, Compass, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import EverydayAI from '../components/EverydayAI';
import DailyChallenge from '../components/DailyChallenge';
import { NetworkSteps, PromptPreview, EthicsPreview } from '../components/StudioExperiments';
import Reveal from '../components/Reveal';

import { useProgress } from '../state/progress-context';
import { learningModules } from '../data/learningModules';

const chapters = [
  { id: 'fundamentals', topic: '01 / THE FOUNDATIONS', title: <>Meet the<br /><em>pattern finders.</em></>, description: 'Nobody wrote the rule that tells a model what a bottle looks like. It worked that out from examples — which is also the reason it falls apart on a photo it has never seen.', tags: ['Training data', 'Machine learning', 'AI limitations'], preview: NetworkSteps },
  { id: 'tools', topic: '02 / THE TOOLKIT', title: <>Better questions.<br /><em>Better possibilities.</em></>, description: '“Help with biology” gets you a wall of text. A good prompt gets you a study partner that quizzes you and waits while you think. The difference is about four extra words.', tags: ['Prompt design', 'Study techniques', 'Verification'], preview: PromptPreview },
  { id: 'ethics', topic: '03 / THE HUMAN SIDE', title: <>Powerful tools.<br /><em>Thoughtful choices.</em></>, description: 'A tool can be 95% accurate and still fail almost everyone in one group. Learn to ask who the data left out, what should never be typed in, and who answers when it gets someone wrong.', tags: ['Fairness & bias', 'Privacy', 'Academic integrity'], preview: EthicsPreview },
  { id: 'creativity', topic: '04 / CREATIVE AI', title: <>Make it useful.<br /><em>Make it yours.</em></>, description: 'Use AI to explore ideas, then choose, revise, and verify the result. Keep your purpose and voice at the center of the work.', tags: ['Creative briefs', 'Revision', 'Disclosure'], preview: null },
];
const faqs = [
  ['Do I need to know how to code?', 'No — and you won’t write any here. The lessons start from things you already use, like playlists and face unlock, and work outward from there. If you’re in grades 9–12 and curious, that’s the whole entry requirement.'],
  ['Do I have to sign up?', 'No. Every lesson and experiment is open right now, no account, no email. Making a profile only sets your name and grade so the dashboard stops calling you “Student.” Either way your progress lives in this browser, on this device.'],
  ['How do XP and badges work?', 'Get at least 2 of 3 right on a chapter quiz and you earn that chapter’s XP and its badge. Both land once, but you can retake a quiz as often as you like to push your best score up.'],
  ['Can I use AI for my schoolwork?', 'Ask your teacher — the rule changes from class to class, and that’s the one that counts. Where it is allowed, the habits that keep you out of trouble are the same ones that make it useful: ask for hints instead of answers, check anything specific, and be able to say what you used it for. The Field Guide walks through all five.'],
];

export default function LandingPage() {

  const { hasOnboarded } = useProgress();

  return <div className="signal-landing studio-home">
    <PublicSiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="studio-hero portal-scene" aria-labelledby="hero-title">
        <div className="landing-width studio-hero-grid">
          <div className="studio-hero-copy">
            <h1 id="hero-title">Understand AI.<br />Think for<br /><em>yourself.</em><ArrowUpRight aria-hidden="true" /></h1>
            <p className="studio-lede">A practical AI learning portal for students in grades 9–12. Build AI fundamentals, learn useful tools, and make thoughtful choices about using AI in school.</p>
            <div className="studio-hero-actions"><Link className="landing-primary" to={hasOnboarded ? '/portal' : '/signup'}>{hasOnboarded ? 'Continue your journey' : 'Find your starting point'}<ArrowUpRight size={19} /></Link><a href="#curriculum" className="studio-text-button">Take a look around <ArrowDown size={17} /></a></div>
          </div>
          <EverydayAI />
        </div>
      </section>

      <section className="studio-challenge-band" aria-labelledby="challenge-band-title">
        <div className="landing-width">
          <h2 id="challenge-band-title">The challenge, built into the learning.</h2>
          <p>For grades 9–12: understand AI, practice useful techniques, use AI responsibly, and track what you learn.</p>
          <div className="challenge-band-links">
            <Link to="/learn?module=fundamentals"><strong>AI concepts</strong><span>How models learn and where they fall short</span></Link>
            <Link to="/learn?module=tools"><strong>Practical tools</strong><span>Prompts and study techniques you can evaluate</span></Link>
            <Link to="/learn?module=ethics"><strong>Ethical use</strong><span>Fairness, privacy, and academic choices</span></Link>
            <Link to="/portal"><strong>Progress</strong><span>Follow lessons, XP, and badges</span></Link>
          </div>
        </div>
      </section>

      <section className="studio-chapters landing-width" id="curriculum" tabIndex={-1}>
        <Reveal><div className="studio-section-heading"><div><p className="studio-eyebrow">01 — CHOOSE YOUR CURIOSITY</p><h2>From “what is AI?”<br />to <em>“watch what I can do.”</em></h2></div><p>Four chapters cover AI foundations, practical tools, ethical use, and creative work.</p></div></Reveal>
        <div className="studio-card-stack">{chapters.map(({ id, topic, title, description, tags, preview: Preview }, index) => {
          const module = learningModules.find(item => item.id === id)!;
          return <article key={id} className={`studio-chapter chapter-${id}`} style={{ '--card-index': index } as CSSProperties}><div className="chapter-topline"><span>{topic}</span><span>SIGNAL LAB / FIELD NOTES</span><span>0{index + 1}</span></div><div className={`chapter-layout ${Preview ? '' : 'chapter-layout--text-only'}`}><div className="chapter-story"><h3>{title}</h3><p>{description}</p><div className="chapter-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="chapter-actions"><Link className="studio-dark-button" to={`/learn?module=${id}`}>Explore the chapter <ArrowUpRight size={18} /></Link><span><Clock3 size={14} />{module.minutes} min · {module.xp} XP</span></div></div>{Preview && <Preview />}</div></article>;
        })}</div>
      </section>

      <DailyChallenge />

      <section className="studio-progress-pitch landing-width"><Reveal className="studio-progress-grid"><div><p className="studio-eyebrow">YOUR EFFORT, MADE VISIBLE</p><h2>Little wins.<br /><em>Real understanding.</em></h2><p>Complete lessons, earn XP and badges, and see your progress in one place.</p><Link to="/progress" className="studio-text-button">See your progress <ArrowRight size={17} /></Link></div><div className="studio-achievement-preview"><div className="achievement-preview-top"><span>YOUR NEXT ACHIEVEMENT</span><Sparkles size={18} /></div><div className="studio-badge-orbit"><span className="badge-satellite"><Check size={17} /></span><div className="studio-big-badge"><BrainCircuit size={46} /><span>PATTERN FINDER</span><small>01</small></div><span className="badge-satellite satellite-two"><Sparkles size={18} /></span></div><h3>Start with AI Fundamentals.</h3><p>Complete the chapter quiz to earn your first badge.</p><div className="achievement-preview-bottom"><span><Award size={17} /> Learning achievement</span><strong>+150 XP</strong></div></div></Reveal></section>

      <section className="studio-about-strip"><div className="landing-width"><Compass size={36} /><p>Built for the generation<br /><em>that gets to shape what comes next.</em></p><Link to="/about">The idea behind Signal <ArrowUpRight size={19} /></Link></div></section>
      <section className="studio-faq landing-width"><Reveal className="studio-faq-grid"><div><p className="studio-eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p><h2>Good questions.<br /><em>Start here.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></Reveal></section>
      <section className="studio-final-cta landing-width"><span className="studio-eyebrow">YOUR NEXT CHAPTER STARTS WITH A QUESTION.</span><h2>What will you<br /><em>figure out next?</em></h2><Link className="landing-primary" to={hasOnboarded ? '/portal' : '/signup'}>Let’s find out <ArrowUpRight size={20} /></Link><div className="cta-doodle doodle-one" aria-hidden="true"><BrainCircuit /></div><div className="cta-doodle doodle-two" aria-hidden="true"><ShieldCheck /></div><div className="cta-doodle doodle-three" aria-hidden="true"><Trophy /></div></section>
    </main><PublicSiteFooter />
  </div>;
}
