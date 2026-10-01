import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BrainCircuit, Check, Clock3, Compass, ShieldCheck, Sparkles, Trophy, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import EverydayAI from '../components/EverydayAI';
import DailyChallenge from '../components/DailyChallenge';
import { NetworkSteps, PromptPreview, EthicsPreview } from '../components/StudioExperiments';
import Reveal from '../components/Reveal';
import TestimonialsSection from '../components/TestimonialsSection';

import { useProgress } from '../state/useProgress';
import { learningModules } from '../data/learningModules';
import { learningResources } from '../data/resources';

const chapters = [
  { id: 'fundamentals', topic: '01 / THE FOUNDATIONS', title: <>Meet the<br /><em>pattern finders.</em></>, description: 'Nobody wrote the rule that tells a model what a bottle looks like. It worked that out from examples — which is also the reason it falls apart on a photo it has never seen.', tags: ['Training data', 'Machine learning', 'AI limitations'], preview: NetworkSteps },
  { id: 'tools', topic: '02 / THE TOOLKIT', title: <>Better questions.<br /><em>Better possibilities.</em></>, description: '“Help with biology” gets you a wall of text. A good prompt gets you a study partner that quizzes you and waits while you think. The difference is about four extra words.', tags: ['Prompt design', 'Study techniques', 'Verification'], preview: PromptPreview },
  { id: 'ethics', topic: '03 / THE HUMAN SIDE', title: <>Powerful tools.<br /><em>Thoughtful choices.</em></>, description: 'A tool can be 95% accurate and still fail almost everyone in one group. Learn to ask who the data left out, what should never be typed in, and who answers when it gets someone wrong.', tags: ['Fairness & bias', 'Privacy', 'Academic integrity'], preview: EthicsPreview },
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
          <div className="studio-hero-copy"><p className="studio-eyebrow"><span className="studio-status-dot" /> A FIELD GUIDE FOR CURIOUS MINDS</p>
            <h1 id="hero-title">Understand AI.<br />Think for<br /><em>yourself.</em><ArrowUpRight aria-hidden="true" /></h1>
            <p className="studio-lede">Big ideas. Hands-on experiments. Better questions.<br />Find your way through AI, without handing over<br className="studio-desktop" /> the thinking that makes you, you.</p>
            <div className="studio-hero-actions"><Link className="landing-primary" to={hasOnboarded ? '/portal' : '/signup'}>{hasOnboarded ? 'Continue your journey' : 'Find your starting point'}<ArrowUpRight size={19} /></Link><a href="#curriculum" className="studio-text-button">Take a look around <ArrowDown size={17} /></a></div>
            <div className="studio-reassurance"><span>GRADES 9–12</span>No experience needed. Just curiosity.</div>
          </div>
          <EverydayAI />
        </div>
        <div className="landing-width studio-hero-bottom"><p>Understand.<br /><em>Experiment. Question.</em></p><div><strong>04</strong><span>learning modules</span></div><div><strong>750</strong><span>XP to discover</span></div><div><strong>100%</strong><span>your own pace</span></div><a href="#curriculum" aria-label="Scroll to the curriculum"><ArrowDown size={24} /></a></div>
      </section>

      <section className="studio-resource-band" aria-label="Learning resources"><div className="landing-width resource-band-heading"><span>GOOD QUESTIONS START WITH GOOD SOURCES.</span><Link to="/resources">Meet your reading list <ArrowUpRight size={14} /></Link></div><div className="resource-marquee"><div className="resource-marquee-track">{[0, 1, 2, 3].map(copy => <div className="resource-marquee-group" key={copy} aria-hidden={copy > 0 ? true : undefined}>{learningResources.map(resource => <span key={resource.name}><span className="resource-monogram">{resource.mark}</span>{resource.name}<Sparkles size={18} /></span>)}</div>)}</div></div><p>Where we send you when a lesson ends. None of these organizations are involved with Signal Lab — we just rate their explanations.</p></section>

      <section className="studio-chapters landing-width" id="curriculum" tabIndex={-1}>
        <Reveal><div className="studio-section-heading"><div><p className="studio-eyebrow">01 — CHOOSE YOUR CURIOSITY</p><h2>From “what is AI?”<br />to <em>“watch what I can do.”</em></h2></div><p>Three essential foundations. A creative fourth chapter. Start wherever your curiosity takes you.</p></div></Reveal>
        <div className="studio-card-stack">{chapters.map(({ id, topic, title, description, tags, preview: Preview }, index) => {
          const module = learningModules.find(item => item.id === id)!;
          return <article key={id} className={`studio-chapter chapter-${id}`} style={{ '--card-index': index } as CSSProperties}><div className="chapter-topline"><span>{topic}</span><span>SIGNAL LAB / FIELD NOTES</span><span>0{index + 1}</span></div><div className="chapter-layout"><div className="chapter-story"><h3>{title}</h3><p>{description}</p><div className="chapter-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="chapter-actions"><Link className="studio-dark-button" to={`/learn?module=${id}`}>Explore the chapter <ArrowUpRight size={18} /></Link><span><Clock3 size={14} />{module.minutes} min · {module.xp} XP</span></div></div><Preview /></div></article>;
        })}</div>
        <Reveal><Link className="studio-creative-strip" to="/learn?module=creativity"><span className="creative-spark"><Wand2 size={26} /></span><div><span className="studio-eyebrow">04 / THE CREATIVE CHAPTER</span><h3>Make something only you could imagine.</h3><p>Bring your own voice to design, storytelling, and creative AI.</p></div><span className="creative-strip-action">Explore Creative AI <ArrowUpRight size={20} /></span></Link></Reveal>
      </section>

      <DailyChallenge />

      <section className="studio-playground-pitch"><div className="landing-width"><Reveal className="playground-pitch-grid"><div className="playground-art" aria-hidden="true"><span className="mini-window window-back"><span>01 / CHANGE THE INPUT</span><BrainCircuit size={62} /></span><span className="mini-window window-middle"><span>02 / ASK A BETTER QUESTION</span><i /><i /><i /><span className="mini-cursor">↗</span></span><span className="mini-window window-front"><Check size={24} /><strong>Oh. Now I get it.</strong><span>THAT’S THE FEELING.</span></span></div><div><p className="studio-eyebrow">02 — LESS WATCHING. MORE DOING.</p><h2>Go ahead.<br /><em>Pull a few levers.</em></h2><p>A tiny classifier. A prompt you can build. A choice worth thinking through. The Playground is your space to find out what happens when you change something.</p><Link className="landing-primary" to="/playground">Step into the Playground <ArrowUpRight size={19} /></Link><span className="studio-small-note">No downloads. No API keys. Just you and an idea.</span></div></Reveal></div></section>

      <section className="studio-progress-pitch landing-width"><Reveal className="studio-progress-grid"><div><p className="studio-eyebrow">03 — YOUR EFFORT, MADE VISIBLE</p><h2>Little wins.<br /><em>Real understanding.</em></h2><p>Build your collection of skills, one chapter at a time. Earn XP, unlock badges, and see how far your curiosity has taken you.</p><Link to="/progress" className="studio-text-button">See your progress <ArrowRight size={17} /></Link></div><div className="studio-achievement-preview"><div className="achievement-preview-top"><span>YOUR NEXT ACHIEVEMENT</span><Sparkles size={18} /></div><div className="studio-badge-orbit"><span className="badge-satellite"><Check size={17} /></span><div className="studio-big-badge"><BrainCircuit size={46} /><span>PATTERN FINDER</span><small>01</small></div><span className="badge-satellite satellite-two"><Sparkles size={18} /></span></div><h3>Start with a spark.</h3><p>Complete AI Fundamentals to earn your first badge.</p><div className="achievement-preview-bottom"><span><Award size={17} /> A skill worth keeping</span><strong>+150 XP</strong></div></div></Reveal></section>

      <section className="studio-about-strip"><div className="landing-width"><Compass size={36} /><p>Built for the generation<br /><em>that gets to shape what comes next.</em></p><Link to="/about">The idea behind Signal <ArrowUpRight size={19} /></Link></div></section>
      <TestimonialsSection />
      <section className="studio-faq landing-width"><Reveal className="studio-faq-grid"><div><p className="studio-eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p><h2>Good questions.<br /><em>Start here.</em></h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></Reveal></section>
      <section className="studio-final-cta landing-width"><span className="studio-eyebrow">YOUR NEXT CHAPTER STARTS WITH A QUESTION.</span><h2>What will you<br /><em>figure out next?</em></h2><Link className="landing-primary" to={hasOnboarded ? '/portal' : '/signup'}>Let’s find out <ArrowUpRight size={20} /></Link><div className="cta-doodle doodle-one" aria-hidden="true"><BrainCircuit /></div><div className="cta-doodle doodle-two" aria-hidden="true"><ShieldCheck /></div><div className="cta-doodle doodle-three" aria-hidden="true"><Trophy /></div></section>
    </main><PublicSiteFooter />
  </div>;
}


