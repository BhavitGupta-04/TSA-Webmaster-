import type { Lesson } from '../data/portalCurriculum';
import { readWorkbook, workbookKey, type Workbook } from '../lib/portalWorkbook';
import { useProgress } from './progress-context';

export function useLessonWorkbook(lesson: Lesson) {
  const progress = useProgress();
  const work = readWorkbook(progress.notesByModule[workbookKey(lesson.id)]);
  const update = (patch: Partial<Workbook>) => progress.saveModuleNotes(
    workbookKey(lesson.id), JSON.stringify({ ...work, ...patch, updatedAt: Date.now() }),
  );
  return { work, update, progress };
}
