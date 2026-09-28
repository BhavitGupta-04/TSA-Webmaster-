import { useState } from 'react';
import { ArrowRight, Check, Copy, RotateCcw, Sparkles } from 'lucide-react';

const stages = [
  { label: 'Examples', text: 'Start with data: examples that represent the task you want a model to learn.' },
  { label: 'Patterns', text: 'During training, a model finds relationships in the examples. Missing examples can mean missing perspectives.' },
  { label: 'Prediction', text: 'A new input produces an output. A useful prediction still needs human judgment.' },
];
export function NetworkSteps() {
  const [stage, setStage] = useState(0);
  const columns = [[55, 120, 185], [35, 92, 148, 205], [80, 160]];
  return <div className="studio-widget"><div className="widget-caption"><span>FOLLOW THE SIGNAL</span><span>01 / 03</span></div>
    <svg viewBox="0 0 360 240" className="network-sketch" role="img" aria-label={`An illustration of examples flowing through patterns to a prediction. ${stages[stage].label} is highlighted.`}>
      {[0, 1].flatMap(c => columns[c].flatMap((y, i) => columns[c + 1].map((next, j) => <line key={`${c}-${i}-${j}`} x1={45 + c * 135} y1={y} x2={180 + c * 135} y2={next} className={c <= stage ? 'lit' : ''} />)))}
      {columns.flatMap((ys, c) => ys.map((y, i) => <g key={`${c}-${i}`}><circle cx={45 + c * 135} cy={y} r={c === stage ? 15 : 9} className={c === stage ? 'lit' : ''} /><circle cx={45 + c * 135} cy={y} r="3" className="node-core" /></g>))}
    </svg>
    <div className="widget-choices" role="group" aria-label="Stages of an AI system">{stages.map((item, index) => <button type="button" key={item.label} aria-pressed={stage === index} onClick={() => setStage(index)}>{item.label}</button>)}</div>
    <p className="widget-explanation" aria-live="polite">{stages[stage].text}</p>
  </div>;
}
export function PromptPreview() {
  const [clear, setClear] = useState(false);
  return <div className="studio-widget prompt-widget"><div className="widget-caption"><span>A BETTER QUESTION</span><Sparkles size={17} /></div><div className="prompt-paper"><span>{clear ? 'A LITTLE MORE INTENTION' : 'THE STARTING POINT'}</span><p>{clear ? '“Quiz me on cell biology at a tenth-grade level. Ask one question at a time. Give a hint before revealing the answer.”' : '“Help me with biology.”'}</p><small>{clear ? 'Context + task + format + room to think' : 'What topic? What level? What kind of help?'}</small></div><button className="studio-text-button" type="button" onClick={() => setClear(!clear)}>{clear ? 'See the original' : 'Make the prompt more useful'}<RotateCcw size={16} /></button><p className="widget-explanation">A clearer prompt guides the response. It does not guarantee a correct answer.</p></div>;
}
export function EthicsPreview() {
  const [choice, setChoice] = useState<number | null>(null);
  return <div className="studio-widget ethics-widget"><div className="widget-caption"><span>THE JUDGMENT CALL</span><span>YOUR TURN</span></div><h4>Your teacher allows AI for brainstorming. What comes next?</h4><div className="ethics-options">{['Submit an AI-written paragraph.', 'Explore ideas, then write it myself.'].map((option, index) => <button key={option} type="button" aria-pressed={choice === index} onClick={() => setChoice(index)}><span>{choice === index ? <Check size={14} /> : String(index + 1).padStart(2, '0')}</span>{option}</button>)}</div><p className="widget-explanation" role="status">{choice === null ? 'Choose an approach to explore the reasoning.' : choice === 1 ? 'Keep the thinking yours. Follow your teacher’s rules for disclosing AI assistance, too.' : 'Permission to brainstorm is not permission to submit AI-written work. Revisit the assignment rules.'}</p></div>;
}

const fruitData = [
  { length: 14, width: 3, label: 'Banana' }, { length: 16, width: 4, label: 'Banana' }, { length: 18, width: 4.5, label: 'Banana' },
  { length: 6, width: 6, label: 'Orange' }, { length: 7, width: 6.5, label: 'Orange' }, { length: 8, width: 8, label: 'Orange' },
];
const chartX = (value: number) => 45 + (value - 3) / 17 * 330;
const chartY = (value: number) => 225 - (value - 2) / 8 * 175;
export function FruitClassifier() {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(5);
  const nearest = fruitData.map((fruit, index) => ({ ...fruit, index, distance: Math.hypot(fruit.length - length, fruit.width - width) })).sort((a, b) => a.distance - b.distance || a.index - b.index).slice(0, 3);
  const bananas = nearest.filter(fruit => fruit.label === 'Banana').length;
  const label = bananas >= 2 ? 'Banana' : 'Orange';
  return <div className="studio-widget classifier-widget"><div className="widget-caption"><span>LIVE CLASSIFIER</span><span>3 NEAREST NEIGHBORS</span></div>
    <svg viewBox="0 0 420 275" className="fruit-chart" role="img" aria-label={`Your fruit is ${length} centimeters long and ${width} centimeters wide. Predicted label: ${label}.`}>
      {[4, 6, 8, 10].map(value => <g key={value}><line x1="45" x2="375" y1={chartY(value)} y2={chartY(value)} /><text x="27" y={chartY(value) + 4}>{value}</text></g>)}
      {[4, 8, 12, 16, 20].map(value => <text key={value} x={chartX(value)} y="246" textAnchor="middle">{value}</text>)}
      <text x="210" y="269" textAnchor="middle">Length (cm)</text><text transform="translate(13,140) rotate(-90)" textAnchor="middle">Width (cm)</text>
      {nearest.map(fruit => <line key={fruit.index} className="neighbor-line" x1={chartX(length)} y1={chartY(width)} x2={chartX(fruit.length)} y2={chartY(fruit.width)} />)}
      {fruitData.map((fruit, index) => <circle key={index} cx={chartX(fruit.length)} cy={chartY(fruit.width)} r="7" fill={fruit.label === 'Banana' ? '#286b70' : '#e9805d'} />)}
      <path d={`M ${chartX(length)} ${chartY(width) - 9} l 9 9 l -9 9 l -9 -9 Z`} fill="#17324d" stroke="white" strokeWidth="2" />
    </svg>
    <div className="chart-legend"><span><i />Banana</span><span><i />Orange</span><span>◆ Your input</span></div>
    <label className="studio-range">Length <output>{length} cm</output><input aria-label="Fruit length" type="range" min="3" max="20" step=".5" value={length} onChange={event => setLength(Number(event.target.value))} /></label>
    <label className="studio-range">Width <output>{width} cm</output><input aria-label="Fruit width" type="range" min="2" max="10" step=".5" value={width} onChange={event => setWidth(Number(event.target.value))} /></label>
    <div className="classifier-result" role="status"><span>Prediction: <strong>{label}</strong></span><span>{Math.max(bananas, 3 - bananas)} of 3 neighbors agree</span></div><p className="widget-explanation">Six invented examples. Two possible labels. Agreement is not a probability or proof: even an apple’s measurements must receive one of these labels.</p>
  </div>;
}
export function PromptBuilder() {
  const [topic, setTopic] = useState('cell biology');
  const [parts, setParts] = useState<string[]>(['Context']);
  const [copyStatus, setCopyStatus] = useState('');
  const subject = topic.trim() || 'my class topic';
  const blocks: Record<string, string> = {
    Context: `I am a high school student studying ${subject}. Explain unfamiliar terms.`,
    Task: `Help me practice ${subject}. Give hints before answers and let me do the thinking.`,
    Format: 'Ask three practice questions, one at a time. Wait for my response after each question.',
    Verification: 'Flag uncertain claims. Suggest what I should check in my textbook. Do not invent citations.',
  };
  const prompt = Object.keys(blocks).filter(part => parts.includes(part)).map(part => blocks[part]).join('\n\n');
  return <div className="studio-widget builder-widget"><div className="widget-caption"><span>BUILD YOUR STUDY PROMPT</span><span>{parts.length} / 4 PARTS</span></div><label htmlFor="prompt-topic">What are you studying?</label><input id="prompt-topic" value={topic} maxLength={80} onChange={event => { setTopic(event.target.value); setCopyStatus(''); }} /><div className="prompt-parts" role="group" aria-label="Prompt ingredients">{Object.keys(blocks).map(part => <button type="button" key={part} aria-pressed={parts.includes(part)} onClick={() => { setParts(current => current.includes(part) ? current.filter(item => item !== part) : [...current, part]); setCopyStatus(''); }}>{parts.includes(part) ? <Check size={14} /> : <span>+</span>}{part}</button>)}</div><label htmlFor="built-prompt">Your assembled prompt</label><textarea id="built-prompt" readOnly value={prompt} rows={7} placeholder="Choose an ingredient above to begin." /><button type="button" className="studio-text-button" disabled={!prompt} onClick={async () => { try { await navigator.clipboard.writeText(prompt); setCopyStatus('Prompt copied.'); } catch { setCopyStatus('Select the prompt above to copy it manually.'); } }}>Copy prompt <Copy size={16} /></button><p role="status" className="widget-explanation">{copyStatus || 'This builder assembles a template locally. It does not send a message to an AI.'}</p></div>;
}
export function ExperimentLink() { return <span className="experiment-link">Change an input. Notice what happens. <ArrowRight size={16} /></span>; }
