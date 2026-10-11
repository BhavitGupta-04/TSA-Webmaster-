import { ArrowUpRight, Compass, Fingerprint, HeartHandshake, Lightbulb, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import Reveal from '../components/Reveal';
import SitePhoto from '../components/SitePhoto';

const principles = [
  { icon: Lightbulb, title: 'Make the invisible make sense.', text: 'Take an abstract idea and turn it into something you can test, question, and explain to a friend.' },
  { icon: Compass, title: 'Leave room for your thinking.', text: 'Use AI to explore possibilities. Keep the reasoning, the decisions, and the final judgment yours.' },
  { icon: HeartHandshake, title: 'Keep people in the picture.', text: 'Fairness, privacy, and honesty belong in every conversation about AI, from the very first lesson.' },
];

export default function AboutPage() {
  return <div className="signal-landing studio-interior">
    <PublicSiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="studio-page-hero">
        <div className="landing-width studio-about-hero">
          <div>
            <p className="studio-eyebrow">OUR STORY / WHY NUVILO AI EXISTS</p>
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
            <p>Nuvilo AI is an AI learning portal we built for the TSA Webmaster competition. It is aimed at students in grades 9–12, mostly because that is who we are and nobody was explaining this to us in a way that stuck.</p>
            <p>Most of what you hear about AI is either a sales pitch or a warning. Neither one tells you how the thing actually works, so neither one helps you decide when to trust it. We wanted the version in between: short lessons, things you can poke at, and straight answers about where it breaks.</p>
            <Link className="studio-text-button" to="/learn?module=fundamentals">See the idea in action <ArrowUpRight size={17} /></Link>
          </div>
        </Reveal>
      </section>

      <section className="landing-width about-photo-pair" aria-label="Students learning together">
        <div className="row g-4">
          <div className="col-12 col-md-6"><SitePhoto id="students-collaborating" caption="Comparing notes beats copying them." /></div>
          <div className="col-12 col-md-6"><SitePhoto id="classroom-laptops" caption="The best questions usually come from the next seat over." /></div>
        </div>
      </section>

      <section id="principles" tabIndex={-1} className="studio-principles">
        <div className="landing-width">
          <p className="studio-eyebrow">WHAT WE BELIEVE</p>
          <h2>Curious by design.<br /><em>Thoughtful by choice.</em></h2>
          <ol className="studio-principles-list">
            {principles.map(({ icon: Icon, title, text }, index) => <Reveal key={title}>
              <li><span className="studio-principle-index">0{index + 1}</span><Icon size={24} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></li>
            </Reveal>)}
          </ol>
        </div>
      </section>

      <section className="landing-width studio-about-method">
        <p className="studio-eyebrow">HOW WE TURN AN IDEA INTO A SKILL</p>
        <h2>A little structure.<br /><em>A lot of discovery.</em></h2>
        <ol className="studio-method-steps">{[['Explore', 'Start with a clear idea and a familiar example.'], ['Experiment', 'Change an input. Compare the result. Ask why.'], ['Reflect', 'Explain what you learned in your own words.'], ['Build', 'Check your understanding and carry the skill into your next project.']].map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>

      <section className="landing-width studio-privacy" id="privacy" tabIndex={-1}>
        <Fingerprint size={38} />
        <div>
          <p className="studio-eyebrow">YOUR SPACE. YOUR PROGRESS.</p>
          <h2>Learn without an email or password.</h2>
          <p>Your name, grade, notes, flashcards, and progress are saved in this browser on this device. They do not sync between devices, and clearing browser storage removes them. Learning activities run in your browser; they do not send your work to an AI service.</p>
          <p>Reference links open other websites, which have their own privacy practices.</p>
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
