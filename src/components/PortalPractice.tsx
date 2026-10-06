import { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Lightbulb, RotateCcw } from 'lucide-react';
import type { Lesson } from '../data/portalCurriculum';
import type { Workbook } from '../lib/portalWorkbook';

const samples = [
  { name: 'AA battery', score: 90, battery: true }, { name: 'Button battery', score: 75, battery: true },
  { name: 'Metal bottle cap', score: 55, battery: false }, { name: 'Damaged battery', score: 40, battery: true },
  { name: 'Drink can', score: 30, battery: false }, { name: 'Paper cup', score: 20, battery: false },
  { name: 'Plastic bottle', score: 10, battery: false }, { name: 'Cardboard', score: 5, battery: false },
];
export default function PortalPractice({ lesson, work, update }: { lesson: Lesson; work: Workbook; update: (patch: Partial<Workbook>) => void }) {
  const [attempted, setAttempted] = useState(false);
  const [hint, setHint] = useState(false);
  const practice = lesson.practice;
  const answers = work.practice;
  const set = (key: string, value: string) => { update({ practice: { ...answers, [key]: value }, practiceDone: false }); setAttempted(false); };
  const items = practice.kind === 'sort' ? practice.items as { text: string; answer: string; why: string }[] : [];
  const initialOrder = practice.kind === 'sequence' ? practice.items as string[] : [];
  let order = initialOrder;
  try {
    const saved: unknown = JSON.parse(answers.order ?? 'null');
    if (Array.isArray(saved) && saved.length === initialOrder.length && new Set(saved).size === initialOrder.length && saved.every(v => initialOrder.includes(v))) order = saved;
  } catch { /* Use original order if saved data is invalid. */ }
  const threshold = Number(answers.threshold ?? 50);
  const correct = samples.filter(row => (row.score >= threshold) === row.battery).length;
  const misses = samples.filter(row => row.battery && row.score < threshold).length;
  const falseAlarms = samples.filter(row => !row.battery && row.score >= threshold).length;
  const promptFields = ['Task: what do you want to practice?', 'Context: topic, level, and where you got stuck', 'Format: how should the help be presented?', 'Boundary: what thinking must stay yours?'];
  let ready = false;
  if (practice.kind === 'sort') ready = items.every((item, i) => answers[i] === item.answer);
  if (practice.kind === 'metrics') ready = ['75', '1', '1'].every((v, i) => answers['metric' + i]?.trim().replace('%', '') === v);
  if (practice.kind === 'fairness') ready = ['90', '60', '80'].every((v, i) => answers['rate' + i]?.trim().replace('%', '') === v) && answers.decision === 'alternative';
  if (practice.kind === 'prompt') ready = promptFields.every((_, i) => (answers['prompt' + i] ?? '').trim().length >= 15) && (answers.revision ?? '').trim().length >= 40;
  if (practice.kind === 'sequence') ready = order.every((item, i) => item === practice.correct?.[i]);

  const numberInput = (label: string, key: string) => <label className="academy-field" key={key}>{label}<input inputMode="decimal" value={answers[key] ?? ''} onChange={e => set(key, e.target.value)} maxLength={8} placeholder="Your calculation" /></label>;
  return <div className="academy-practice">
    <p className="academy-kicker">Hands-on lab / about 6 minutes</p><h2>{practice.title}</h2><p className="academy-lede">{practice.intro}</p>
    {practice.kind === 'sort' && <div className="academy-sort">{items.map((item, i) => <div key={item.text}><label htmlFor={'sort-' + i}><span className="academy-number">{i + 1}</span>{item.text}</label><select id={'sort-' + i} value={answers[i] ?? ''} onChange={e => set(String(i), e.target.value)}><option value="">Choose a category</option>{practice.options?.map(option => <option key={option}>{option}</option>)}</select>{attempted && <p className="academy-feedback">{answers[i] === item.answer ? 'Correct. ' : 'Revisit this one. '}{item.why}</p>}</div>)}</div>}
    {practice.kind === 'metrics' && <>
      <div className="academy-simulation"><div className="academy-simulation-head"><span className="academy-kicker">A fictional score model</span><span>Not a trained AI service</span></div>
        <label className="academy-field" htmlFor="threshold">Battery threshold: {threshold}<input id="threshold" type="range" min="10" max="90" step="5" value={threshold} onChange={e => set('threshold', e.target.value)} /></label>
        <div className="academy-mini-stats"><div><strong>{Math.round(correct / samples.length * 100)}%</strong><span>accuracy</span></div><div><strong>{misses}</strong><span>missed batteries</span></div><div><strong>{falseAlarms}</strong><span>false alarms</span></div></div>
        <div className="academy-table-wrap"><table><caption>Eight invented objects. Prediction = battery when score is at or above the threshold.</caption><thead><tr><th scope="col">Object / true label</th><th scope="col">Score</th><th scope="col">Prediction</th><th scope="col">Result</th></tr></thead><tbody>{samples.map(row => <tr key={row.name}><th scope="row">{row.name}<small>{row.battery ? 'Battery' : 'Not battery'}</small></th><td>{row.score}</td><td>{row.score >= threshold ? 'Battery' : 'Not battery'}</td><td>{(row.score >= threshold) === row.battery ? 'Correct' : 'Error'}</td></tr>)}</tbody></table></div>
      </div>
      <h3>Investigation: use a threshold of 50</h3><p>Move the slider to explore at least two settings. Then return to 50 and calculate these values. Which mistake would concern you most?</p>
      <button className="academy-link-button" type="button" onClick={() => set('threshold', '50')}>Set threshold to 50 <RotateCcw size={15} /></button>
      <div className="academy-input-grid">{numberInput('Accuracy at 50 (%)', 'metric0')}{numberInput('Missed batteries at 50', 'metric1')}{numberInput('False alarms at 50', 'metric2')}</div>
      {attempted && !ready && <p className="academy-feedback">At 50, inspect the bottle cap and damaged battery. Divide correct predictions by all eight examples.</p>}
    </>}
    {practice.kind === 'fairness' && <>
      <div className="academy-audit-chart" aria-label="Clear room: 36 of 40 correct. Noisy room: 12 of 20 correct."><div><span>Clear room / 36 of 40</span><div><i style={{ width: '90%' }} /></div></div><div><span>Noisy room / 12 of 20</span><div><i style={{ width: '60%' }} /></div></div></div>
      <div className="academy-input-grid">{numberInput('Clear room accuracy (%)', 'rate0')}{numberInput('Noisy room accuracy (%)', 'rate1')}{numberInput('Overall accuracy (%)', 'rate2')}</div>
      <label className="academy-field">What is the strongest next step?<select value={answers.decision ?? ''} onChange={e => set('decision', e.target.value)}><option value="">Choose a decision</option><option value="require">Require speech entry because the average is good.</option><option value="alternative">Offer a typed alternative and investigate noisy-room errors.</option><option value="hide">Remove the noisy-room results from the report.</option></select></label>
      {attempted && !ready && <p className="academy-feedback">Use 36 / 40, 12 / 20, and 48 / 60. A strong decision protects participation while the gap is investigated.</p>}
    </>}
    {practice.kind === 'prompt' && <>
      <div className="academy-input-grid">{promptFields.map((label, i) => <label className="academy-field" key={label}>{label}<textarea rows={3} maxLength={1200} value={answers['prompt' + i] ?? ''} onChange={e => set('prompt' + i, e.target.value)} placeholder={['Ask me one question about...', 'I am learning... I find this step difficult...', 'Wait for my answer, then...', 'Do not give me the solution before...'][i]} /></label>)}</div>
      <div className="academy-example"><span className="academy-kicker">Your assembled prompt / local preview</span><p>{promptFields.map((_, i) => answers['prompt' + i]).filter(Boolean).join('\n\n') || 'Your prompt will appear here as you write.'}</p></div>
      <label className="academy-field">Improve it: which instruction would you revise, and why?<textarea rows={3} maxLength={1500} value={answers.revision ?? ''} onChange={e => set('revision', e.target.value)} placeholder="I would make... more specific because..." /></label>
      <p className="academy-small">The check confirms that all four pieces and your revision are present. It does not grade prompt quality or call an AI service.</p>
      {attempted && !ready && <p className="academy-feedback">Give each prompt piece at least 15 characters and your revision explanation at least 40 characters.</p>}
    </>}
    {practice.kind === 'sequence' && <ol className="academy-sequence">{order.map((item, i) => <li key={item}><span className="academy-number">{i + 1}</span><p>{item}</p><div>{[-1, 1].map(direction => <button className="academy-icon-button" type="button" key={direction} disabled={i + direction < 0 || i + direction >= order.length} aria-label={(direction === -1 ? 'Move up: ' : 'Move down: ') + item} onClick={() => { const next = [...order]; [next[i], next[i + direction]] = [next[i + direction], next[i]]; set('order', JSON.stringify(next)); }}><ArrowDown size={16} style={{ transform: direction === -1 ? 'rotate(180deg)' : undefined }} /></button>)}</div></li>)}</ol>}
    <div className="academy-actions"><button className="academy-button" type="button" onClick={() => { setAttempted(true); update({ practiceDone: ready }); }}>Check my work <ArrowRight size={16} /></button><button className="academy-link-button" type="button" aria-expanded={hint} onClick={() => setHint(!hint)}><Lightbulb size={16} />Need a hint?</button></div>
    {hint && <aside className="academy-hint">{practice.hint}</aside>}
    <div role="status">{work.practiceDone ? <p className="academy-success"><CheckCircle2 size={20} />Lab complete. Explain what you noticed in your project.</p> : attempted ? <p className="academy-feedback">Not quite finished. Use the feedback, revise, and check again. There is no penalty for trying.</p> : null}</div>
  </div>;
}
