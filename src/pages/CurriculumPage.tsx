import { ArrowRight, ArrowUpRight, MessageSquareText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lessons, units } from '../data/portalCurriculum';
import SitePhoto from '../components/SitePhoto';
import Reveal from '../components/Reveal';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';

const chapterPhotos = [
  { id: 'robotic-arm', caption: 'A machine that sorts has to learn what it is looking at first.' },
  { id: 'study-notes', caption: 'Writing the question down is half the work.' },
  { id: 'workshop-discussion', caption: 'Some questions need a room, not an algorithm.' },
  { id: 'creative-tablet', caption: 'The tool suggests. You decide.' },
];

export default function CurriculumPage() {
  return (
    <div className="signal-landing studio-interior curriculum-page">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="curriculum-hero">
          <div className="landing-width curriculum-hero-layout">
            <div>
              <h1>{lessons.length} lessons.<br /><em>Four learning paths.</em></h1>
              <p>Explore AI foundations, practical study tools, responsible use, and creative projects through focused lessons with practice and quizzes.</p>
              <div className="curriculum-hero-actions"><Link className="landing-primary" to={`/learn?lesson=${lessons[0].id}`}>Start the first lesson <ArrowUpRight size={18} /></Link><span>{lessons.length} lessons <i /> {units.length} paths <i /> Practice &amp; quizzes</span></div>
            </div>
            <nav className="curriculum-hero-art" aria-label="Choose a curriculum chapter">
              <span className="curriculum-orbit curriculum-orbit--outer" aria-hidden="true" />
              <span className="curriculum-orbit curriculum-orbit--inner" aria-hidden="true" />
              <div className="curriculum-orbit-core" aria-hidden="true">AI<br /><small>FIELD NOTES</small></div>
              {units.map((unit, index) => {
                const firstLesson = lessons.find(lesson => lesson.unit === unit.id);
                return <Link key={unit.id} className={`orbit-label orbit-label--${['one', 'two', 'three', 'four'][index]}`} to={firstLesson ? `/learn?lesson=${firstLesson.id}` : '/learn'}>{unit.number} · {unit.title}</Link>;
              })}
            </nav>
          </div>
        </section>

        <section className="landing-width curriculum-roadmap">
          <Reveal><div className="curriculum-intro"><div><p className="studio-eyebrow">THE FULL LEARNING PATH</p><h2>One skill at a time.<br /><em>Built to practice.</em></h2></div><p>Each lesson includes guided explanations, examples, interactive practice, a short project, and a separate quiz. Choose a lesson below and continue at your own pace.</p></div></Reveal>
          <div className="curriculum-module-list">
            {units.map((unit, index) => {
              const unitLessons = lessons.filter(lesson => lesson.unit === unit.id);
              const photo = chapterPhotos[index];
              return <Reveal key={unit.id} className={`curriculum-module curriculum-module--${index + 1}`}>
                <div className="curriculum-module-marker"><span>0{index + 1}</span><i /></div>
                <article className="curriculum-module-card">
                  <div className="curriculum-module-copy">
                    <div className="curriculum-module-kicker"><span>{unit.number} / LEARNING PATH</span><span>{unitLessons.length} lessons</span></div>
                    <h3>{unit.title}</h3>
                    <p>{unit.description}</p>
                    <ol className="curriculum-lesson-list">
                      {unitLessons.map((lesson, lessonIndex) => <li key={lesson.id}>
                        <span className="curriculum-lesson-number">{String(lessonIndex + 1).padStart(2, '0')}</span>
                        <Link to={`/learn?lesson=${lesson.id}`}><strong>{lesson.title}</strong><span>{lesson.subtitle}</span></Link>
                        <ArrowRight size={16} aria-hidden="true" />
                      </li>)}
                    </ol>
                  </div>
                  <div className="curriculum-module-image"><SitePhoto id={photo.id} caption={photo.caption} /><span className="curriculum-xp"><Sparkles size={14} /> {unit.badge}</span></div>
                </article>
              </Reveal>;
            })}
          </div>
        </section>

        <section className="curriculum-finale"><div className="landing-width curriculum-finale-inner"><p className="studio-eyebrow">THE POINT ISN’T TO USE AI FOR EVERYTHING.</p><h2>It’s knowing when, why,<br /><em>and what to question.</em></h2><Link className="landing-primary" to="/learn?module=tools">Explore practical tools <ArrowUpRight size={18} /></Link></div></section>

        <section className="landing-width curriculum-ask"><MessageSquareText size={24} /><div><h2>Stuck on a word before you even start?</h2><p>Ask Signal is in the bottom corner of every page. It can explain a term, point you at the right chapter, or help you shape a question before you take it to a real AI tool.</p></div></section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
