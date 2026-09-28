import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, BrainCircuit, Check, CheckCircle2, ChevronRight, Clock3, ExternalLink, Layers3, Lightbulb, RotateCcw, Sparkles, Target, Trophy } from 'lucide-react';
import { learningModules, type LearningModule } from '../data/learningModules';
import { useProgress } from '../state/useProgress';
import '../styles/learning.css';

type Panel = 'lesson' | 'cards' | 'quiz' | 'resources';
const panels: { id: Panel; label: string; icon: typeof BookOpen }[] = [
  { id: 'lesson', label: 'Learn', icon: BookOpen },
  { id: 'cards', label: 'Practice', icon: Layers3 },
  { id: 'quiz', label: 'Check understanding', icon: CheckCircle2 },
  { id: 'resources', label: 'Explore more', icon: ExternalLink },
];

function ModuleWorkspace({ module, onNext }: { module: LearningModule; onNext?: () => void }) {
  const { notesByModule, saveModuleNotes, flashcardsByModule, addFlashcard, recordModuleScore, completeModule, completedModules } = useProgress();
  const [panel, setPanel] = useState<Panel>('lesson');
  const [scenarioOpen, setScenarioOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [earnedNow, setEarnedNow] = useState(false);
  const cards = [
    ...module.concepts.map((concept, index) => ({ id: `${module.id}-${index}`, front: concept.title, back: concept.body })),
    ...(flashcardsByModule[module.id] ?? []),
  ];
  const card = cards[cardIndex];
  const answeredCount = Object.keys(answers).length;
  const submitted = result !== null;

  function submitQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answeredCount !== module.questions.length || submitted) return;
    const correct = module.questions.filter((question, index) => answers[index] === question.answer).length;
    const score = Math.round(correct / module.questions.length * 100);
    setResult(score);
    recordModuleScore(module.id, score);
    if (score >= 60) {
      setEarnedNow(!completedModules.includes(module.id));
      completeModule(module.id, module.xp, module.badgeId);
    }
  }

  function createCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!front.trim() || !back.trim()) return;
    addFlashcard(module.id, { id: crypto.randomUUID(), front: front.trim(), back: back.trim() });
    setFront('');
    setBack('');
    setCardMessage('Flashcard added to this module.');
    setCardIndex(cards.length);
    setRevealed(false);
  }

  return (
    <section className="lab-workspace" aria-labelledby="module-title">
      <header className="lab-module-header">
        <div className="lab-meta"><span><Clock3 size={14} /> About {module.minutes} min</span><span><Sparkles size={14} /> {module.xp} XP</span><span>Beginner friendly</span></div>
        <h2 id="module-title">{module.title}</h2>
        <p>{module.description}</p>
      </header>
      <nav className="lab-tabs" aria-label="Module activities">
        {panels.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-current={panel === id ? 'page' : undefined} onClick={() => setPanel(id)}><Icon size={17} /><span>{label}</span></button>)}
      </nav>
      <div className="lab-content">
        {panel === 'lesson' && <>
          <div className="lab-outcome"><Target size={21} /><div><span className="lab-eyebrow">Your learning goal</span><p>{module.outcome}</p></div></div>
          <div className="lab-concepts">
            {module.concepts.map((concept, index) => <article className="lab-concept" key={concept.title}>
              <span className="lab-concept-number" aria-hidden="true">0{index + 1}</span>
              <div><h3>{concept.title}</h3><p>{concept.body}</p><div className="lab-example"><span>In real life</span><p>{concept.example}</p></div></div>
            </article>)}
          </div>
          <section className="lab-scenario" aria-labelledby="scenario-title">
            <div className="lab-section-label"><Lightbulb size={18} /><span>Pause & think</span></div>
            <h3 id="scenario-title">What would you do?</h3><p>{module.scenario.prompt}</p>
            <button className="lab-text-button" type="button" aria-expanded={scenarioOpen} aria-controls="scenario-answer" onClick={() => setScenarioOpen(!scenarioOpen)}>{scenarioOpen ? 'Hide explanation' : 'Compare your thinking'}<ChevronRight size={16} /></button>
            {scenarioOpen && <div id="scenario-answer" className="lab-scenario-answer">{module.scenario.explanation}</div>}
          </section>
          <section className="lab-notes">
            <label htmlFor="lesson-notes">Make it stick. Put it in your own words.</label>
            <p>Summarize the idea or capture your response to the scenario.</p>
            <textarea id="lesson-notes" rows={4} value={notesByModule[module.id] ?? ''} onChange={(event) => saveModuleNotes(module.id, event.target.value)} placeholder="One thing I learned is..." />
            <span className="lab-small">Notes save automatically in this browser.</span>
          </section>
          <div className="lab-panel-footer"><span>Ready to put it into practice?</span><button className="lab-button" type="button" onClick={() => setPanel('cards')}>Practice with flashcards <ArrowRight size={16} /></button></div>
        </>}

        {panel === 'cards' && <>
          <div className="lab-section-heading"><div><span className="lab-eyebrow">Recall before you reveal</span><h3>A little practice goes a long way.</h3></div><span className="lab-pill">{cards.length} cards</span></div>
          <p className="lab-muted">Explain the idea out loud, then reveal the answer to check your understanding.</p>
          <button type="button" className={`lab-flashcard ${revealed ? 'is-revealed' : ''}`} aria-expanded={revealed} onClick={() => setRevealed(!revealed)}>
            <span className="lab-eyebrow">{revealed ? 'The explanation' : 'Explain this idea'}</span>
            <span className="lab-card-copy">{revealed ? card.back : card.front}</span>
            <span className="lab-card-hint"><RotateCcw size={15} />{revealed ? 'Show the question' : 'Click or press Enter to reveal'}</span>
          </button>
          <div className="lab-card-controls"><button className="lab-icon-button" type="button" aria-label="Previous flashcard" onClick={() => { setCardIndex((cardIndex - 1 + cards.length) % cards.length); setRevealed(false); }}><ArrowLeft size={18} /></button><span aria-live="polite">Card {cardIndex + 1} of {cards.length}</span><button className="lab-icon-button" type="button" aria-label="Next flashcard" onClick={() => { setCardIndex((cardIndex + 1) % cards.length); setRevealed(false); }}><ArrowRight size={18} /></button></div>
          <details className="lab-custom-cards"><summary>Create your own flashcard</summary><form onSubmit={createCard}><label htmlFor="card-front">Question or concept</label><input id="card-front" required maxLength={300} value={front} onChange={(event) => setFront(event.target.value)} placeholder="What would you like to remember?" /><label htmlFor="card-back">Answer in your own words</label><textarea id="card-back" required maxLength={1500} rows={3} value={back} onChange={(event) => setBack(event.target.value)} /><button className="lab-button" type="submit" disabled={!front.trim() || !back.trim()}>Add flashcard</button><p role="status" className="lab-small">{cardMessage}</p></form></details>
          <div className="lab-panel-footer"><span>Feeling confident?</span><button className="lab-button" type="button" onClick={() => setPanel('quiz')}>Check understanding <ArrowRight size={16} /></button></div>
        </>}

        {panel === 'quiz' && <>
          <div className="lab-section-heading"><div><span className="lab-eyebrow">Put your ideas to the test</span><h3>Think it through. You can try again.</h3></div></div>
          <p className="lab-muted">Answer all {module.questions.length} questions. Get at least 2 correct to complete this module. XP is awarded once.</p>
          <form onSubmit={submitQuiz} className="lab-quiz">
            {module.questions.map((question, questionIndex) => <fieldset key={question.prompt} disabled={submitted}>
              <legend><span>{String(questionIndex + 1).padStart(2, '0')}</span>{question.prompt}</legend>
              {question.options.map((option, optionIndex) => <label key={option} className={`lab-answer ${answers[questionIndex] === optionIndex ? 'is-selected' : ''} ${submitted && optionIndex === question.answer ? 'is-correct' : ''} ${submitted && answers[questionIndex] === optionIndex && optionIndex !== question.answer ? 'is-incorrect' : ''}`}><input type="radio" required name={`question-${questionIndex}`} value={optionIndex} checked={answers[questionIndex] === optionIndex} onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))} /><span>{option}</span>{submitted && optionIndex === question.answer && <Check size={17} aria-label="Correct answer" />}</label>)}
              {submitted && <p className="lab-feedback"><strong>{answers[questionIndex] === question.answer ? 'Correct. ' : 'Take another look. '}</strong>{question.explanation}</p>}
            </fieldset>)}
            {!submitted && <div className="lab-panel-footer"><span>{answeredCount} of {module.questions.length} answered</span><button className="lab-button" type="submit" disabled={answeredCount !== module.questions.length}>Check my answers <ArrowRight size={16} /></button></div>}
          </form>
          {submitted && <div className={`lab-result ${result >= 60 ? 'is-passed' : ''}`} role="status"><Trophy size={28} /><div><h3>{result >= 60 ? 'Module complete!' : 'Keep building your understanding.'} {result}%</h3><p>{earnedNow ? `You earned ${module.xp} XP. ` : ''}{result >= 60 ? 'Review the explanations to strengthen what you know.' : 'Review the explanations above, then give it another try.'}</p><div className="lab-result-actions"><button type="button" className="lab-text-button" onClick={() => { setAnswers({}); setResult(null); setEarnedNow(false); }}>Try again <RotateCcw size={15} /></button>{result >= 60 && onNext && <button className="lab-button" type="button" onClick={onNext}>Next module <ArrowRight size={16} /></button>}</div></div></div>}
        </>}

        {panel === 'resources' && <>
          <span className="lab-eyebrow">Follow your curiosity</span><h3 className="lab-resource-title">Go a little deeper.</h3><p className="lab-muted">Optional reading from educational organizations. These links open in a new tab.</p>
          <div className="lab-resources">{module.resources.map((resource) => <a href={resource.url} key={resource.url} target="_blank" rel="noopener noreferrer"><div className="lab-resource-icon"><BookOpen size={22} /></div><div><span className="lab-eyebrow">{resource.publisher}</span><h4>{resource.title}</h4><p>{resource.description}</p></div><ExternalLink size={18} aria-label="Opens in a new tab" /></a>)}</div>
          <div className="lab-source-note"><Lightbulb size={19} /><p>As you read, connect one new idea to the lesson. Add it to your notes and explain why it matters.</p></div>
        </>}
      </div>
      <footer className="lab-mission"><div className="lab-mission-icon"><Sparkles size={22} /></div><div><span className="lab-eyebrow">Take it beyond the lesson</span><h3>Your mini challenge</h3><p>{module.mission}</p></div></footer>
    </section>
  );
}

export default function LearningHubPage() {
  const { displayName, learnerId, completedModules, moduleScores } = useProgress();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeModule = learningModules.find((module) => module.id === searchParams.get('module')) ?? learningModules[0];
  const activeIndex = learningModules.indexOf(activeModule);
  const completedCount = learningModules.filter((module) => completedModules.includes(module.id)).length;
  const selectModule = (id: string) => setSearchParams({ module: id });

  return (
    <div className="learn-page lab-page">
      <div className="lab-container">
        <header className="learn-hero lab-hero">
          <div><p className="lab-eyebrow">Signal Lab / Learning studio</p><h1>Understand AI.<br /><span>Make it work for you.</span></h1><p className="lab-hero-description">Big ideas. Real-world practice. Your space to explore AI,<br className="lab-desktop-break" /> one skill at a time. Let's get started, {displayName}.</p><div className="lab-hero-tags"><span>Grades 9–12</span><span>4 hands-on modules</span><span>No coding needed</span></div></div>
          <div className="lab-hero-art" aria-hidden="true"><div className="lab-orbit"><span className="lab-orbit-dot" /><div className="lab-brain"><BrainCircuit size={66} strokeWidth={1.3} /></div><span className="lab-art-spark"><Sparkles size={22} /></span><span className="lab-art-check"><Check size={20} /></span></div><span className="lab-art-caption">A little curiosity. A lot of possibility.</span></div>
        </header>
        <div className="lab-layout">
          <aside className="lab-sidebar">
            <div className="lab-path-heading"><span className="lab-eyebrow">Your learning path</span><span>{completedCount}/4</span></div>
            <progress className="lab-progress" value={completedCount} max={learningModules.length} aria-label="Modules completed" />
            <nav className="lab-path" aria-label="Learning modules">{learningModules.map((module, index) => {
              const complete = completedModules.includes(module.id);
              return <button key={module.id} type="button" className={activeModule.id === module.id ? 'is-active' : ''} aria-current={activeModule.id === module.id ? 'step' : undefined} onClick={() => selectModule(module.id)}><span className={`lab-path-number ${complete ? 'is-complete' : ''}`}>{complete ? <Check size={17} /> : String(index + 1).padStart(2, '0')}</span><span className="lab-path-copy"><strong>{module.title}</strong><span>{complete ? 'Completed' : `${module.minutes} min`}<span aria-hidden="true"> · </span>{moduleScores[module.id] !== undefined ? `Best: ${moduleScores[module.id]}%` : `${module.xp} XP`}</span></span><ChevronRight size={16} /></button>;
            })}</nav>
            <div className="lab-sidebar-note"><div className="lab-section-label"><Lightbulb size={18} /><span>Small steps count.</span></div><p>Start anywhere. Take your time. Every module gives you a new way to think about AI.</p></div>
            <p className="lab-storage-note">Your progress stays in this browser on this device.</p>
          </aside>
          <ModuleWorkspace key={`${learnerId}-${activeModule.id}`} module={activeModule} onNext={activeIndex < learningModules.length - 1 ? () => selectModule(learningModules[activeIndex + 1].id) : undefined} />
        </div>
        <div className="lab-bottom-note"><BrainCircuit size={17} /><span>Stay curious. Think critically. Keep the human in the loop.</span></div>
      </div>
    </div>
  );
}
