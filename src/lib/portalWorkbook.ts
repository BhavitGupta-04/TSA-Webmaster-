import type { Lesson } from '../data/portalCurriculum';

export interface Workbook {
  step: number;
  updatedAt: number;
  checks: Record<string, number>;
  practice: Record<string, string>;
  practiceDone: boolean;
  guidedResponse: string;
  guidedReviewed: boolean;
  quizChecked: number[];
  project: string[];
  rubric: boolean[];
  quiz: Record<string, number>;
  submitted: boolean;
  notes: string;
}
export const workbookKey = (id: string) => 'portal-workbook-v2:' + id;
const numberMap = (value: unknown): Record<string, number> => value && typeof value === 'object'
  ? Object.fromEntries(Object.entries(value).filter(([, v]) => Number.isInteger(v) && Number(v) >= 0)) : {};
const stringMap = (value: unknown): Record<string, string> => value && typeof value === 'object'
  ? Object.fromEntries(Object.entries(value).filter(([, v]) => typeof v === 'string')) : {};
export function readWorkbook(raw?: string): Workbook {
  let data: Partial<Workbook> = {};
  try { const parsed: unknown = JSON.parse(raw ?? '{}'); if (parsed && typeof parsed === 'object') data = parsed; } catch { /* An older note is not a workbook. */ }
  return {
    step: typeof data.step === 'number' && Number.isInteger(data.step) ? Math.max(0, Math.min(5, data.step)) : 0,
    updatedAt: typeof data.updatedAt === 'number' && Number.isFinite(data.updatedAt) ? data.updatedAt : 0,
    checks: numberMap(data.checks), practice: stringMap(data.practice), practiceDone: data.practiceDone === true,
    guidedResponse: typeof data.guidedResponse === 'string' ? data.guidedResponse : '',
    guidedReviewed: data.guidedReviewed === true,
    quizChecked: Array.isArray(data.quizChecked) ? [...new Set(data.quizChecked.filter(i => Number.isInteger(i) && i >= 0 && i < 5))] : data.submitted ? Object.keys(numberMap(data.quiz)).map(Number) : [],
    project: Array.isArray(data.project) ? data.project.map(v => typeof v === 'string' ? v : '') : [],
    rubric: Array.isArray(data.rubric) ? data.rubric.map(v => v === true) : [],
    quiz: numberMap(data.quiz), submitted: data.submitted === true, notes: typeof data.notes === 'string' ? data.notes : '',
  };
}
export function projectReady(lesson: Lesson, work: Workbook) {
  return lesson.project.fields.every((_, i) => (work.project[i] ?? '').trim().length >= 40)
    && lesson.project.rubric.every((_, i) => work.rubric[i]);
}
export function prerequisitesReady(lesson: Lesson, work: Workbook) {
  return lesson.sections.every((section, i) => work.checks[i] === section.check.answer)
    && work.practiceDone && work.guidedResponse.trim().length >= 80 && work.guidedReviewed && projectReady(lesson, work);
}
export function quizScore(lesson: Lesson, work: Workbook) {
  return Math.round(lesson.quiz.filter((q, i) => work.quiz[i] === q.answer).length / lesson.quiz.length * 100);
}
export function stepDone(lesson: Lesson, work: Workbook, index: number) {
  if (index < 3) return work.checks[index] === lesson.sections[index].check.answer;
  if (index === 3) return work.practiceDone && work.guidedResponse.trim().length >= 80 && work.guidedReviewed;
  if (index === 4) return projectReady(lesson, work);
  return work.submitted && prerequisitesReady(lesson, work) && quizScore(lesson, work) >= 80;
}
export function downloadWorkbook(lesson: Lesson, work: Workbook) {
  const text = [
    'SIGNAL LAB / LEARNING WORKBOOK', lesson.title,
    '\nPROJECT: ' + lesson.project.title,
    ...lesson.project.fields.map((field, i) => '\n' + field + '\n' + (work.project[i] || '[Not answered]')),
    '\nSELF-REVIEW (not an instructor grade)',
    ...lesson.project.rubric.map((criterion, i) => (work.rubric[i] ? '[x] ' : '[ ] ') + criterion),
    '\nGUIDED PRACTICE\n' + work.guidedResponse,
    '\nNOTES\n' + work.notes,
    '\nPRACTICE RESPONSES\n' + JSON.stringify(work.practice, null, 2),
    '\nLESSON REFERENCE\n' + lesson.sourceName + ': ' + lesson.source,
  ].join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'signal-' + lesson.id + '-workbook.txt'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
