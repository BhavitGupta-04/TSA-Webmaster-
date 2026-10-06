import extensions from '../data/lessonExtensions.json';
import type { Workbook } from '../lib/portalWorkbook';
export default function LessonCaseStudy({ lessonId, index, work, update }: { lessonId: string; index: number; work: Workbook; update: (value: Partial<Workbook>) => void }) {
 const item = extensions[lessonId as keyof typeof extensions]?.[index];
 if (!item) return null;
 const key = 'case-study-' + index;
 return <section className="lesson-case-study" aria-label="School situation"><p className="academy-kicker">MAKE THE CONNECTION / A SCHOOL SITUATION</p><h3>{item.title}</h3><p>{item.story}</p><label className="academy-field"><strong>Think it through</strong><span>{item.question}</span><textarea rows={4} maxLength={3000} value={work.practice[key] ?? ''} onChange={event => update({ practice: { ...work.practice, [key]: event.target.value } })} placeholder="What would you do, and which detail supports your choice?" /><small>Your thinking saves in this browser. This response is for reflection, not an automatic grade.</small></label><details><summary>Compare with one possible explanation</summary><p>{item.reasoning}</p><p>Look for the reason behind the answer. Revise your response if you notice something you missed.</p></details></section>;
}
