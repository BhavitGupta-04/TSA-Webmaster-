import { useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Clock3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { learningModules } from '../data/learningModules';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Reveal from '../components/Reveal';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';

const imageBriefs = [
  'Students testing how a model recognizes patterns',
  'A student drafting a helpful study prompt',
  'A team discussing fairness and AI',
  'Students using AI to build a creative project',
];

export default function CurriculumPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <div className="signal-landing studio-interior curriculum-page">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="curriculum-hero">
          <div className="landing-width curriculum-hero-layout">
            <div>
              <p className="studio-eyebrow"><span className="studio-status-dot" /> THE SIGNAL LEARNING PATH</p>
              <h1>Four chapters.<br /><em>A whole new lens.</em></h1>
              <p>Start with the basics, work with real tools, ask the harder questions, and finish by making something with your own point of view.</p>
              <div className="curriculum-hero-actions"><Link className="landing-primary" to="/learn?module=fundamentals">Start chapter one <ArrowUpRight size={18} /></Link><span>4 modules <i /> 54 minutes <i /> 750 XP</span></div>
            </div>
            <nav className="curriculum-hero-art" aria-label="Choose a curriculum chapter">
              <span className="curriculum-orbit curriculum-orbit--outer" aria-hidden="true" />
              <span className="curriculum-orbit curriculum-orbit--inner" aria-hidden="true" />
              <div className="curriculum-orbit-core" aria-hidden="true">AI<br /><small>FIELD NOTES</small></div>
              <Link className="orbit-label orbit-label--one" to="/learn?module=fundamentals">01 · FOUNDATIONS</Link>
              <Link className="orbit-label orbit-label--two" to="/learn?module=tools">02 · TOOLKIT</Link>
              <Link className="orbit-label orbit-label--three" to="/learn?module=ethics">03 · ETHICS</Link>
              <Link className="orbit-label orbit-label--four" to="/learn?module=creativity">04 · CREATIVE AI</Link>
            </nav>
          </div>
        </section>

        <section className="landing-width curriculum-roadmap">
          <Reveal><div className="curriculum-intro"><div><p className="studio-eyebrow">WHAT WE’RE GOING TO TEACH</p><h2>Learn the idea.<br /><em>Try it for yourself.</em></h2></div><p>Every chapter has a clear goal, real-life examples, a hands-on activity, practice cards, and a short unit quiz. Move at your pace and come back whenever you need a refresher.</p></div></Reveal>
          <div className="curriculum-module-list">
            {learningModules.map((module, index) => (
              <Reveal key={module.id} className={`curriculum-module curriculum-module--${index + 1}`}>
                <div className="curriculum-module-marker"><span>0{index + 1}</span><i /></div>
                <article className="curriculum-module-card">
                  <div className="curriculum-module-copy">
                    <div className="curriculum-module-kicker"><span>CHAPTER 0{index + 1}</span><span><Clock3 size={14} /> {module.minutes} MIN</span></div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <div className="curriculum-outcome"><span>YOU’LL BE ABLE TO</span><p>{module.outcome}</p></div>
                    <button className="curriculum-learn-more" type="button" aria-expanded={expandedModule === module.id} aria-controls={`curriculum-detail-${module.id}`} onClick={() => setExpandedModule(current => current === module.id ? null : module.id)}>{expandedModule === module.id ? 'Hide lesson details' : 'Learn more · see every lesson'}<ChevronDown size={16} /></button>
                    <div className="curriculum-module-details" id={`curriculum-detail-${module.id}`} hidden={expandedModule !== module.id}>
                      <h4>WHAT YOU’LL LEARN</h4>
                      <ol>{module.concepts.map((concept, lessonIndex) => <li key={concept.title}><span>LESSON 0{lessonIndex + 1}</span><strong>{concept.title}</strong><p>{concept.body}</p><small><b>Real-world example</b> {concept.example}</small></li>)}</ol>
                      <div className="curriculum-detail-practice"><span>PAUSE & THINK</span><p>{module.scenario.prompt}</p><span>TAKE IT FURTHER</span><p>{module.mission}</p></div>
                    </div>
                    <Link className="curriculum-module-link" to={`/learn?module=${module.id}`}>Explore this chapter <ArrowRight size={17} /></Link>
                  </div>
                  <div className="curriculum-module-image"><ImagePlaceholder label={imageBriefs[index]} variant={index % 2 === 0 ? 'classroom' : 'project'} /><span className="curriculum-xp"><Sparkles size={14} /> {module.xp} XP</span></div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="curriculum-finale"><div className="landing-width curriculum-finale-inner"><p className="studio-eyebrow">THE POINT ISN’T TO USE AI FOR EVERYTHING.</p><h2>It’s knowing when, why,<br /><em>and what to question.</em></h2><Link className="landing-primary" to="/playground">Try an experiment <ArrowUpRight size={18} /></Link></div></section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
