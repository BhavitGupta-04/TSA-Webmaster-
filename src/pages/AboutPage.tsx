import { ArrowUpRight, Compass, Fingerprint, HeartHandshake, Lightbulb, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import Reveal from '../components/Reveal';
import SitePhoto from '../components/SitePhoto';

const principles = [
  { icon: Lightbulb, title: 'Make the invisible make sense.', text: 'Take an abstract idea and turn it into something you can test, question, and explain to a friend.' },
  { icon: Compass, title: 'Leave room for your thinking.', text: 'Use AI to explore possibilities. Keep the reasoning, the decisions, and the final judgment yours.' },
  { icon: HeartHandshake, title: 'Keep people in the picture.', text: 'Fairness, privacy, and honesty belong in every conversation about AI, from the very first lesson.' },
];

const valueCards = [
  { id: 'curiosity', icon: Lightbulb, title: 'Curiosity first', prompt: 'Start with a better question.', detail: 'We make room to explore how AI works, test our assumptions, and follow the questions that appear along the way.' },
  { id: 'judgment', icon: Compass, title: 'Your judgment matters', prompt: 'The tool is not the thinker.', detail: 'Lessons emphasize checking claims, reflecting on choices, and keeping your own reasoning in the work.' },
  { id: 'people', icon: HeartHandshake, title: 'People stay central', prompt: 'Technology has human effects.', detail: 'Fairness, privacy, accessibility, and academic honesty belong in the conversation from the start.' },
];

const teamCards = [
  { name: 'Bhavit', role: 'LEARNING & RESEARCH', icon: Lightbulb, text: 'Helps turn big ideas about AI into clear lessons and examples students can understand.' },
  { name: 'Tejash', role: 'DESIGN & EXPERIENCE', icon: Compass, text: 'Helps shape a learning experience that feels welcoming, organized, and easy to explore.' },
  { name: 'Shubh', role: 'CONTENT & INTERACTIONS', icon: Sparkles, text: 'Contributes to the activities and interactive details that make the lessons engaging.' },
  { name: 'Ishans', role: 'BUILD & TESTING', icon: HeartHandshake, text: 'Helps build and check the portal, with care for usability, accessibility, and student privacy.' },
];

export default function AboutPage() {
  const [flippedValue, setFlippedValue] = useState<string | null>(null);

  return <div className="signal-landing studio-interior">
    <PublicSiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="studio-page-hero">
        <div className="landing-width studio-about-hero">
          <div>
            <p className="studio-eyebrow">OUR STORY / WHY SIGNAL EXISTS</p>
            <h1>The future needs<br /><em>curious people.</em></h1>
            <p>AI is becoming part of how we learn and create. Understanding it should feel like an invitation to explore.</p>
          </div>
          <div className="studio-about-art" aria-hidden="true">
            <div><Users size={65} /><span>HUMAN FIRST.</span></div>
            <Sparkles className="about-spark" size={34} />
            <span className="about-art-note">Keep asking why. ↗</span>
          </div>
        </div>
      </section>

      <section className="landing-width studio-about-story">
        <Reveal className="studio-story-grid">
          <div>
            <p className="studio-eyebrow">A STUDENT PROJECT. A BIG QUESTION.</p>
            <h2>What if learning AI<br /><em>started with curiosity?</em></h2>
          </div>
          <div>
            <p>Signal Lab is an AI learning portal we built for the TSA Webmaster competition. It is aimed at students in grades 9–12, mostly because that is who we are and nobody was explaining this to us in a way that stuck.</p>
            <p>Most of what you hear about AI is either a sales pitch or a warning. Neither one tells you how the thing actually works, so neither one helps you decide when to trust it. We wanted the version in between: short lessons, things you can poke at, and straight answers about where it breaks.</p>
            <Link className="studio-text-button" to="/playground">See the idea in action <ArrowUpRight size={17} /></Link>
          </div>
        </Reveal>
      </section>

      <section className="landing-width about-photo-pair" aria-label="Students learning together">
        <div className="row g-4">
          <div className="col-12 col-md-6"><SitePhoto id="students-collaborating" caption="Comparing notes beats copying them." /></div>
          <div className="col-12 col-md-6"><SitePhoto id="classroom-laptops" caption="The best questions usually come from the next seat over." /></div>
        </div>
      </section>

      <section className="landing-width studio-about-team" aria-labelledby="about-team-heading">
        <div className="about-team-orbit" aria-hidden="true"><span /><span /><span /><span /></div>
        <Reveal>
          <p className="studio-eyebrow"><Users size={15} /> STUDENT-LED / TSA WEBMASTER</p>
          <h2 id="about-team-heading">Meet the team<br /><em>behind Signal Lab.</em></h2>
          <p className="studio-about-team-intro">Four students, one shared goal: make AI easier to understand, question, and use thoughtfully.</p>
        </Reveal>
        <div className="about-team-grid">
          {teamCards.map(({ name, role, icon: Icon, text }, index) => <Reveal key={name} className="about-team-reveal">
            <article className={`about-team-card about-team-card--${index + 1}`}>
              <span className="about-team-index">0{index + 1} / 04</span>
              <span className="about-team-avatar" aria-hidden="true">{name.slice(0, 1)}</span>
              <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
              <p className="about-team-label">{role}</p>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          </Reveal>)}
        </div>
      </section>

      <section id="principles" tabIndex={-1} className="studio-principles">
        <div className="landing-width">
          <p className="studio-eyebrow">WHAT WE BELIEVE</p>
          <h2>Curious by design.<br /><em>Thoughtful by choice.</em></h2>
          <div className="studio-principles-grid">
            {principles.map(({ icon: Icon, title, text }, index) => <Reveal key={title}>
              <article className={`studio-principles-card studio-principles-card--${index + 1}`}><span>0{index + 1}</span><Icon size={28} /><h3>{title}</h3><p>{text}</p></article>
            </Reveal>)}
          </div>
        </div>
      </section>

      <section className="landing-width about-value-section">
        <Reveal>
          <div className="about-value-heading">
            <div><p className="studio-eyebrow">OUR VALUES / TURN TO EXPLORE</p><h2>How we want AI<br /><em>to feel in your hands.</em></h2></div>
            <p>Choose a card to read more about what guides the project.</p>
          </div>
        </Reveal>
        <div className="about-value-deck">
          {valueCards.map(({ id, icon: Icon, title, prompt, detail }, index) => {
            const isFlipped = flippedValue === id;
            return <Reveal key={id} className="about-value-reveal">
              <button type="button" className={`about-value-card about-value-card--${index + 1} ${isFlipped ? 'is-flipped' : ''}`} aria-pressed={isFlipped} aria-label={`${isFlipped ? 'Show front of' : 'Reveal'} ${title}`} onClick={() => setFlippedValue(isFlipped ? null : id)}>
                <span className="about-value-inner">
                  <span className="about-value-face about-value-front" aria-hidden={isFlipped}>
                    <span className="about-value-index">0{index + 1} / SIGNAL PRINCIPLE</span>
                    <Icon size={34} strokeWidth={1.4} />
                    <strong>{title}</strong>
                    <span className="about-value-prompt">{prompt}</span>
                    <span className="about-value-turn">READ MORE <ArrowUpRight size={14} /></span>
                  </span>
                  <span className="about-value-face about-value-back" aria-hidden={!isFlipped}>
                    <span className="about-value-index">WHY IT MATTERS</span>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                    <span className="about-value-turn">TURN BACK <ArrowUpRight size={14} /></span>
                  </span>
                </span>
              </button>
            </Reveal>;
          })}
        </div>
      </section>

      <section className="landing-width studio-about-method">
        <p className="studio-eyebrow">HOW WE TURN AN IDEA INTO A SKILL</p>
        <h2>A little structure.<br /><em>A lot of discovery.</em></h2>
        <div>{[['Explore', 'Start with a clear idea and a familiar example.'], ['Experiment', 'Change an input. Compare the result. Ask why.'], ['Reflect', 'Explain what you learned in your own words.'], ['Build', 'Check your understanding and carry the skill into your next project.']].map(([title, text], index) => <Reveal key={title} className="about-method-reveal">
          <article><span>0{index + 1}<ArrowUpRight size={19} /></span><h3>{title}</h3><p>{text}</p></article>
        </Reveal>)}</div>
      </section>

      <section className="landing-width studio-privacy" id="privacy" tabIndex={-1}>
        <Fingerprint size={38} />
        <div>
          <p className="studio-eyebrow">YOUR SPACE. YOUR PROGRESS.</p>
          <h2>Learn without an email or password.</h2>
          <p>Your name, grade, notes, flashcards, and progress are saved in this browser on this device. They do not sync between devices, and clearing browser storage removes them. The Playground runs locally; its inputs are not sent to an AI service.</p>
          <p>External resource links open other websites, which have their own privacy practices.</p>
        </div>
      </section>

      <section className="studio-inline-cta landing-width">
        <div><p className="studio-eyebrow">BRING YOUR QUESTIONS.</p><h2>We’ll bring a place to explore.</h2></div>
        <Link className="landing-primary" to="/learn">Find your first chapter <ArrowUpRight size={18} /></Link>
      </section>
    </main>
    <PublicSiteFooter />
  </div>;
}
