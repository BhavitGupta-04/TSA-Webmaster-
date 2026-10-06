import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clock3, Lightbulb, RotateCcw, Trophy } from 'lucide-react';
import { lessons, lessonXP, type Lesson } from '../data/portalCurriculum';
import { useLessonWorkbook } from '../state/useLessonWorkbook';
import { prerequisitesReady, quizScore, stepDone } from '../lib/portalWorkbook';

function QuizSession({ lesson }: { lesson: Lesson }) {
  const { work, update, progress } = useLessonWorkbook(lesson);
  const [index, setIndex] = useState(() => Math.max(0, lesson.quiz.findIndex((_, i) => !work.quizChecked.includes(i))));
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const ready = prerequisitesReady(lesson, work);
  const question = lesson.quiz[index];
  const checked = work.quizChecked.includes(index);
  const choice = work.quiz[index];
  const answered = lesson.quiz.filter((_, i) => work.quizChecked.includes(i)).length;
  const score = quizScore(lesson, work);
  const nextLesson = lessons[lessons.indexOf(lesson) + 1];
  useEffect(() => {
    if (!firstRender.current) heading.current?.focus({ preventScroll: true });
    firstRender.current = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [index, work.submitted]);
  function finish() {
    if (!ready || answered !== lesson.quiz.length || work.submitted) return;
    update({ submitted: true });
    progress.recordModuleScore(lesson.id, score);
    if (score >= 80) {
      progress.completeModule(lesson.id, lessonXP);
      const siblings = lessons.filter(item => item.unit === lesson.unit);
      if (siblings.every(item => item.id === lesson.id || progress.completedModules.includes(item.id))) {
        progress.completeModule(lesson.unit, 0, 'ai-' + lesson.unit);
        progress.recordModuleScore(lesson.unit, Math.round(siblings.reduce((sum, item) => sum + (item.id === lesson.id ? score : progress.moduleScores[item.id] ?? 0), 0) / siblings.length));
      }
    }
  }
  return <div className="academy-page lesson-focus-page lesson-quiz-page"><Link className="lesson-back" to={'/learn?lesson=' + lesson.id}><ArrowLeft size={15} />Back to the lesson</Link><header className="lesson-quiz-header"><p className="academy-kicker">SKILL CHECK / {lesson.title}</p><h1>{work.submitted ? 'Your quiz review' : 'Show what you understand.'}</h1><p>Five questions. One idea at a time. Read the feedback and learn from every attempt.</p><div><span><Clock3 size={15} />About 5 minutes</span><span>4 of 5 correct to pass</span><span>{lessonXP} XP, awarded once</span></div></header>
    {!ready && !work.submitted ? <section className="lesson-quiz-gate"><Lightbulb size={28} /><h2 ref={heading} tabIndex={-1}>A little learning to finish first.</h2><p>This check builds on the lesson. Finish the items below, then come back when you are ready.</p><ul>{[...lesson.sections.map(section => section.title), 'Worked example and hands-on lab', 'Project and self-review'].map((title, i) => <li key={title}><span>{stepDone(lesson, work, i) ? <CheckCircle2 size={18} /> : <span className="lesson-open-circle" />}</span>{title}</li>)}</ul><Link className="academy-button" to={'/learn?lesson=' + lesson.id}>Return to my lesson <ArrowRight size={16} /></Link></section> : work.submitted ? <section className="lesson-quiz-results"><div className="lesson-result-summary"><Trophy size={34} /><h2 ref={heading} tabIndex={-1}>{score >= 80 ? 'You have earned this skill.' : 'You are finding the gaps. Keep going.'}</h2><strong>{score}%</strong><p>{score >= 80 ? 'Your lesson completion is saved. Use the review below to explain why each answer works.' : 'Revisit the ideas you missed, then try again. Your best score stays saved.'}</p><div className="academy-actions"><button type="button" className="academy-secondary" onClick={() => { update({ quiz: {}, quizChecked: [], submitted: false }); setIndex(0); }}><RotateCcw size={15} />Try again</button>{score >= 80 && nextLesson ? <Link className="academy-button" to={'/learn?lesson=' + nextLesson.id}>Next lesson <ArrowRight size={16} /></Link> : <Link className="academy-button" to={score >= 80 ? '/progress' : '/learn?lesson=' + lesson.id}>{score >= 80 ? 'See my progress' : 'Review the lesson'}<ArrowRight size={16} /></Link>}</div></div><h3>Your answer review</h3>{lesson.quiz.map((item, i) => <article className="lesson-answer-review" key={item.prompt}><span>{work.quiz[i] === item.answer ? <CheckCircle2 size={18} /> : <Lightbulb size={18} />}Question {i + 1}</span><h4>{item.prompt}</h4><p><b>Your answer:</b> {item.options[work.quiz[i]] ?? 'Not answered'}</p>{work.quiz[i] !== item.answer && <p><b>Correct answer:</b> {item.options[item.answer]}</p>}<p>{item.explanation}</p></article>)}</section> : <section className="lesson-quiz-card"><div className="lesson-question-progress"><span>Question {index + 1} of {lesson.quiz.length}</span><span>{answered} checked</span><progress max={lesson.quiz.length} value={answered} aria-label="Quiz questions checked" /></div><form onSubmit={event => { event.preventDefault(); if (choice !== undefined && !checked) update({ quizChecked: [...work.quizChecked, index] }); }}><fieldset disabled={checked}><legend><h2 ref={heading} tabIndex={-1}>{question.prompt}</h2></legend>{question.options.map((option, optionIndex) => <label className={checked && optionIndex === question.answer ? 'is-correct' : choice === optionIndex ? 'is-selected' : ''} key={option}><input type="radio" name="quiz-answer" checked={choice === optionIndex} onChange={() => update({ quiz: { ...work.quiz, [index]: optionIndex } })} /><span className="lesson-option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{checked && optionIndex === question.answer && <Check size={18} />}</label>)}</fieldset>{!checked && <button className="academy-button" type="submit" disabled={choice === undefined}>Check answer <ArrowRight size={16} /></button>}</form>{checked && <div role="status" className={'lesson-inline-feedback ' + (choice === question.answer ? 'is-correct' : '')}><strong>{choice === question.answer ? 'Correct. Here’s why.' : 'A useful mistake to learn from.'}</strong><p>{question.explanation}</p>{choice !== question.answer && <p><b>The answer is:</b> {question.options[question.answer]}</p>}</div>}<footer className="lesson-footer"><button className="academy-secondary" type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft size={16} />Previous</button>{index < lesson.quiz.length - 1 ? <button className="academy-button" type="button" disabled={!checked} onClick={() => setIndex(index + 1)}>Next question <ArrowRight size={16} /></button> : <button className="academy-button" type="button" disabled={answered !== lesson.quiz.length} onClick={finish}>See my results <ArrowRight size={16} /></button>}</footer><p className="academy-small">Answers are saved as you go. Checked answers are locked for this attempt; you can retry after the review.</p></section>}
  </div>;
}
export default function LessonQuizPage() {
  const { lessonId } = useParams();
  const lesson = lessons.find(item => item.id === lessonId);
  if (!lesson) return <div className="academy-page lesson-focus-page"><h1>That lesson could not be found.</h1><Link className="academy-button" to="/portal">Choose a lesson</Link></div>;
  return <QuizSession key={lesson.id} lesson={lesson} />;
}
