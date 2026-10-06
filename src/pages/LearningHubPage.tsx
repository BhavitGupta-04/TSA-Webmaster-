import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronRight, Clock3, Lightbulb, Target } from 'lucide-react';
import { lessons, units, type Lesson } from '../data/portalCurriculum';
import { lessonGuides } from '../data/lessonGuides';
import { useProgress } from '../state/progress-context';
import { useLessonWorkbook } from '../state/useLessonWorkbook';
import { prerequisitesReady, projectReady, stepDone } from '../lib/portalWorkbook';
import PortalPractice from '../components/PortalPractice';
import LessonVideo from '../components/LessonVideo';
import LessonCaseStudy from '../components/LessonCaseStudy';
import LessonReferences from '../components/LessonReferences';
import LessonStudyTools from '../components/LessonStudyTools';

function LessonSession({ lesson }: { lesson: Lesson }) {
  const { work, update } = useLessonWorkbook(lesson);
  const current = Math.min(work.step, 4);
  const phase = current < 3 ? 'learn' : current === 3 ? 'practice' : 'project';
  const guide = lessonGuides[lesson.id];
  const [choice, setChoice] = useState<number | undefined>(work.checks[current]);
  const [checked, setChecked] = useState(work.checks[current] !== undefined);
  const [showCompare, setShowCompare] = useState(false);
  const sectionHeading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const unit = units.find(item => item.id === lesson.unit)!;
  const completedSteps = [0, 1, 2, 3, 4].filter(index => stepDone(lesson, work, index)).length;
  const move = (step: number) => {
    update({ step });
    setChoice(work.checks[step]);
    setChecked(work.checks[step] !== undefined);
  };
  useEffect(() => {
    if (!firstRender.current) {
      sectionHeading.current?.focus({ preventScroll: true });
      document.querySelector('.lesson-focus-content')?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    firstRender.current = false;
  }, [current]);
  return <div className="academy-page lesson-focus-page">
    <nav className="lesson-breadcrumb" aria-label="Breadcrumb"><Link to="/portal"><ArrowLeft size={14} />All lessons</Link><ChevronRight size={13} /><span>{unit.title}</span></nav>
    <header className="lesson-focus-header"><div><p className="academy-kicker">LESSON {String(lessons.indexOf(lesson) + 1).padStart(2, '0')} / ONE SKILL AT A TIME</p><h1>{lesson.title}</h1><p>{lesson.subtitle}</p></div><div className="lesson-time"><Clock3 size={18} /><span><strong>About 35 minutes</strong><small>Then a separate 5-minute quiz</small></span></div></header>
    <nav className="lesson-phase-nav" aria-label="Lesson activities"><button type="button" aria-current={phase === 'learn' ? 'page' : undefined} onClick={() => move(Math.min(current, 2))}><span>1</span>Learn<small>20 min</small></button><button type="button" aria-current={phase === 'practice' ? 'page' : undefined} onClick={() => move(3)}><span>2</span>Practice<small>8 min</small></button><button type="button" aria-current={phase === 'project' ? 'page' : undefined} onClick={() => move(4)}><span>3</span>Apply<small>7 min</small></button><Link to={'/learn/' + lesson.id + '/quiz'}><CheckCircle2 size={18} />Quiz<small>Separate page</small></Link></nav>
    <div className="lesson-focus-content">
      {current < 3 && <article className="lesson-reading">
        <div className="lesson-reading-heading"><span className="academy-kicker">LEARN / PART {current + 1} OF 3</span><nav aria-label="Reading sections">{lesson.sections.map((section, index) => <button key={section.title} type="button" aria-label={'Part ' + (index + 1) + ': ' + section.title} aria-current={current === index ? 'step' : undefined} onClick={() => move(index)}>{work.checks[index] === section.check.answer ? <Check size={14} /> : index + 1}</button>)}</nav></div>
        <h2 ref={sectionHeading} tabIndex={-1}>{lesson.sections[current].title}</h2>
        {current === 0 && <><p className="lesson-essential">{lesson.essential}</p><p className="academy-small">Choose the video or read at your own pace, then try the activities. Times are estimates; take longer whenever you need.</p><LessonVideo lessonId={lesson.id} /><LessonReferences lessonId={lesson.id} /><details className="lesson-objectives"><summary><Target size={16} />What you will learn</summary><ul>{lesson.goals.map(goal => <li key={goal}>{goal}</li>)}</ul></details></>}
        <div className="lesson-prose">{lesson.sections[current].body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        <aside className="lesson-real-example"><p className="academy-kicker">A concrete example</p><p>{lesson.sections[current].example}</p></aside>
        <LessonCaseStudy lessonId={lesson.id} index={current} work={work} update={update} />
        <section className="lesson-checkpoint" aria-label="Reading checkpoint"><p className="academy-kicker">YOUR TURN / CHECK THE IDEA</p><fieldset><legend>{lesson.sections[current].check.prompt}</legend>{lesson.sections[current].check.options.map((option, index) => <label key={option} className={choice === index ? 'is-selected' : ''}><input type="radio" name="reading-check" checked={choice === index} onChange={() => { setChoice(index); setChecked(false); }} /><span>{option}</span></label>)}</fieldset><button className="academy-button" type="button" disabled={choice === undefined} onClick={() => { if (choice !== undefined) { update({ checks: { ...work.checks, [current]: choice } }); setChecked(true); } }}>Check my thinking</button>{checked && <div className={work.checks[current] === lesson.sections[current].check.answer ? 'lesson-inline-feedback is-correct' : 'lesson-inline-feedback'} role="status"><strong>{work.checks[current] === lesson.sections[current].check.answer ? 'That’s the idea.' : 'Let’s work through it.'}</strong><p>{lesson.sections[current].check.explanation}</p>{work.checks[current] !== lesson.sections[current].check.answer && <p>Read the example again, choose another answer, and explain why it fits.</p>}</div>}</section>
        <footer className="lesson-footer"><button type="button" className="academy-secondary" disabled={current === 0} onClick={() => move(current - 1)}><ArrowLeft size={16} />Previous part</button><button type="button" className="academy-button" onClick={() => move(current + 1)}>{current < 2 ? 'Next part' : 'Work through an example'}<ArrowRight size={16} /></button></footer>
      </article>}
      {current === 3 && <div className="lesson-practice-view">
        <section className="lesson-worked-example"><p className="academy-kicker">GUIDED PRACTICE / FIRST, FOLLOW THE REASONING</p><h2 ref={sectionHeading} tabIndex={-1}>{guide.workedTitle}</h2><p className="lesson-essential">{guide.scenario}</p><ol>{guide.steps.map(([title, explanation], index) => <li key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{explanation}</p></div></li>)}</ol><aside className="lesson-misconception"><Lightbulb size={20} /><div><strong>A common mix-up</strong><p>{guide.mistake}</p></div></aside><label className="academy-field"><strong>Now try a similar situation</strong><span>{guide.tryPrompt}</span><textarea rows={5} maxLength={4000} value={work.guidedResponse} onChange={event => update({ guidedResponse: event.target.value, guidedReviewed: false })} placeholder="Make a prediction, explain the reasoning, and give a specific example." /><small>Write a few thoughtful sentences (at least 80 characters).</small></label><button type="button" className="academy-secondary" aria-expanded={showCompare} onClick={() => setShowCompare(!showCompare)}>{showCompare ? 'Hide comparison' : 'Compare your reasoning'}</button>{showCompare && <div className="lesson-inline-feedback"><p>{guide.compare}</p><p>Other well-supported answers can work too. Compare the reasoning, not just the wording.</p></div>}<label className="lesson-self-review"><input type="checkbox" checked={work.guidedReviewed} onChange={event => update({ guidedReviewed: event.target.checked })} /><span>I compared the reasoning and revised my explanation where needed.</span></label><p className="academy-small">This written response is self-reviewed; it is not automatically graded.</p></section>
        <div className="lesson-lab-divider"><span>NOW PUT IT TO WORK</span></div><PortalPractice lesson={lesson} work={work} update={update} />
        <footer className="lesson-footer"><button type="button" className="academy-secondary" onClick={() => move(2)}><ArrowLeft size={16} />Back to the explanation</button><button type="button" className="academy-button" onClick={() => move(4)}>Apply the skill <ArrowRight size={16} /></button></footer>
      </div>}
      {current === 4 && <section className="lesson-project"><p className="academy-kicker">APPLY / MAKE THE SKILL YOURS</p><h2 ref={sectionHeading} tabIndex={-1}>{lesson.project.title}</h2><p className="lesson-essential">{lesson.project.brief}</p><p className="lesson-project-direction">Spend about seven minutes planning and explaining your decisions. Use your own examples. Your draft saves as you write.</p>{lesson.project.fields.map((field, index) => <label key={field} className="academy-field"><span><b>{index + 1}.</b> {field}</span><textarea rows={4} maxLength={5000} value={work.project[index] ?? ''} onChange={event => { const project = [...work.project]; project[index] = event.target.value; update({ project, rubric: [] }); }} placeholder="Explain the decision and the reason behind it." /><small>{(work.project[index] ?? '').trim().length} characters / at least 40 to record a response</small></label>)}<details className="lesson-project-example"><summary>See one possible approach</summary><p>{lesson.project.model}</p></details><fieldset className="academy-rubric"><legend>Review your work</legend><p>Check each statement when your response demonstrates it. This is your self-review, not a teacher’s grade. Editing a response clears the review.</p>{lesson.project.rubric.map((criterion, index) => <label key={criterion}><input type="checkbox" checked={work.rubric[index] ?? false} onChange={event => { const rubric = [...work.rubric]; rubric[index] = event.target.checked; update({ rubric }); }} /><span>{criterion}</span></label>)}</fieldset><details className="lesson-project-example"><summary>Optional challenge</summary><p>{lesson.project.stretch}</p></details>{projectReady(lesson, work) && <p role="status" className="academy-success"><CheckCircle2 size={17} />Project saved and self-reviewed.</p>}<aside className="lesson-takeaway"><BookOpen size={20} /><p>{guide.takeaway}</p></aside><div className="lesson-quiz-invitation"><div><h3>Ready to check your understanding?</h3><p>The quiz opens on its own page. Five questions, one at a time, with explanations.</p>{!prerequisitesReady(lesson, work) && <p className="academy-small">Finish any remaining reading checks and practice before submitting the quiz.</p>}</div><Link className="academy-button" to={'/learn/' + lesson.id + '/quiz'}>Go to quiz <ArrowRight size={16} /></Link></div><footer className="lesson-footer"><button className="academy-secondary" type="button" onClick={() => move(3)}><ArrowLeft size={16} />Back to practice</button><Link to="/portal" className="academy-link-button">Save & return to my learning</Link></footer></section>}
    </div>
    <div className="lesson-saved-strip"><span><CheckCircle2 size={14} />Your work saves in this browser.</span><span>{completedSteps} of 5 learning checkpoints complete</span></div>
    <LessonStudyTools lesson={lesson} work={work} update={update} />
  </div>;
}
export default function LearningHubPage() {
  const { learnerId, completedModules } = useProgress();
  const [params] = useSearchParams();
  const [defaultId] = useState(() => lessons.find(lesson => !completedModules.includes(lesson.id))?.id ?? lessons[0].id);
  const lesson = lessons.find(item => item.id === params.get('lesson')) ?? lessons.find(item => item.unit === params.get('module')) ?? lessons.find(item => item.id === defaultId) ?? lessons[0];
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [lesson.id]);
  return <LessonSession key={learnerId + lesson.id} lesson={lesson} />;
}
