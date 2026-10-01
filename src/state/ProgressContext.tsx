import { useEffect, useState, type ReactNode } from 'react';
import type { Flashcard, LearningProgress, ProgressActions } from '../types/learning';
import { ProgressContext } from './progress-context';
import { nextStreak } from '../lib/levels';

const STORAGE_KEY_PREFIX = 'ai-learning-portal-progress-';
const CURRENT_LEARNER_KEY = 'ai-learning-portal-current-learner';

function generateLearnerId() {
  return `learner-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createFreshProgress(learnerId: string, displayName = 'Student', hasOnboarded = false, gradeLevel: number | null = null): LearningProgress {
  return {
    learnerId,
    displayName: displayName.trim() || 'Student',
    gradeLevel,
    xp: 0,
    completedModules: [],
    earnedBadges: [],
    hasOnboarded,
    moduleScores: {},
    flashcardsByModule: {},
    notesByModule: {},
    streak: 0,
    lastVisit: null,
  };
}

function isValidFlashcard(card: unknown): card is Flashcard {
  return Boolean(
    card &&
      typeof card === 'object' &&
      typeof (card as Flashcard).id === 'string' &&
      typeof (card as Flashcard).front === 'string' &&
      typeof (card as Flashcard).back === 'string'
  );
}

function normalizeFlashcards(value: unknown): Record<string, Flashcard[]> {
  if (!value || typeof value !== 'object') return {};

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([moduleId, cards]) => [
      moduleId,
      Array.isArray(cards)
        ? cards.filter(isValidFlashcard)
        : [],
    ])
  );
}

function readProgress(learnerId: string): LearningProgress {
  if (typeof window === 'undefined') return createFreshProgress(learnerId, 'Student', false);

  try {
    const saved = window.localStorage.getItem(`${STORAGE_KEY_PREFIX}${learnerId}`);
    if (!saved) return createFreshProgress(learnerId, 'Student', false);

    const parsed = JSON.parse(saved) as Partial<LearningProgress>;
    const moduleScores = parsed.moduleScores && typeof parsed.moduleScores === 'object'
      ? Object.fromEntries(
          Object.entries(parsed.moduleScores).filter(
            ([key, value]) => typeof key === 'string' && typeof value === 'number'
          )
        )
      : {};

    return {
      learnerId,
      displayName: typeof parsed.displayName === 'string' ? parsed.displayName : 'Student',
      gradeLevel: typeof parsed.gradeLevel === 'number' && parsed.gradeLevel >= 9 && parsed.gradeLevel <= 12 ? parsed.gradeLevel : null,
      xp: typeof parsed.xp === 'number' && parsed.xp >= 0 ? parsed.xp : 0,
      completedModules: Array.isArray(parsed.completedModules)
        ? parsed.completedModules.filter((id): id is string => typeof id === 'string')
        : [],
      earnedBadges: Array.isArray(parsed.earnedBadges)
        ? parsed.earnedBadges.filter((id): id is string => typeof id === 'string')
        : [],
      hasOnboarded: parsed.hasOnboarded === true,
      moduleScores,
      flashcardsByModule: normalizeFlashcards(parsed.flashcardsByModule),
      notesByModule:
        parsed.notesByModule && typeof parsed.notesByModule === 'object'
          ? Object.fromEntries(
              Object.entries(parsed.notesByModule).filter(
                ([key, value]) => typeof key === 'string' && typeof value === 'string'
              )
            )
          : {},
      streak: typeof parsed.streak === 'number' && parsed.streak >= 0 ? parsed.streak : 0,
      lastVisit: typeof parsed.lastVisit === 'string' ? parsed.lastVisit : null,
    };
  } catch {
    return createFreshProgress(learnerId, 'Student', false);
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [learnerId, setLearnerId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'learner-default';

    const existing = window.localStorage.getItem(CURRENT_LEARNER_KEY);
    if (existing) return existing;

    const generated = generateLearnerId();
    window.localStorage.setItem(CURRENT_LEARNER_KEY, generated);
    return generated;
  });

  const [progress, setProgress] = useState<LearningProgress>(() => {
    if (typeof window === 'undefined') return createFreshProgress('learner-default', 'Student', false);

    const activeLearner = window.localStorage.getItem(CURRENT_LEARNER_KEY) || learnerId;
    return readProgress(activeLearner);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem(CURRENT_LEARNER_KEY, learnerId);
    window.localStorage.setItem(`${STORAGE_KEY_PREFIX}${learnerId}`, JSON.stringify(progress));
  }, [learnerId, progress]);

  // Count today's visit once. `changed` is false when today is already counted,
  // which keeps this from looping against the save effect above.
  useEffect(() => {
    setProgress((current) => {
      const result = nextStreak(current.lastVisit, current.streak);
      if (!result.changed) return current;
      return { ...current, streak: result.streak, lastVisit: result.lastVisit };
    });
  }, [learnerId]);

  const value: LearningProgress & ProgressActions = {
    ...progress,
    updateDisplayName: (displayName) => {
      setProgress((current) => ({ ...current, displayName: displayName.trim() || 'Student' }));
    },
    completeModule: (moduleId, xp, badgeId) => {
      setProgress((current) => {
        const alreadyComplete = current.completedModules.includes(moduleId);
        const alreadyEarned = badgeId ? current.earnedBadges.includes(badgeId) : true;

        return {
          ...current,
          xp: alreadyComplete ? current.xp : current.xp + Math.max(0, xp),
          completedModules: alreadyComplete ? current.completedModules : [...current.completedModules, moduleId],
          earnedBadges: !badgeId || alreadyEarned ? current.earnedBadges : [...current.earnedBadges, badgeId],
          moduleScores: {
            ...current.moduleScores,
            [moduleId]: current.moduleScores[moduleId] ?? 0,
          },
        };
      });
    },
    recordModuleScore: (moduleId, score) => {
      setProgress((current) => ({
        ...current,
        moduleScores: {
          ...current.moduleScores,
          [moduleId]: Math.max(current.moduleScores[moduleId] ?? 0, Math.min(100, Math.max(0, score))),
        },
      }));
    },
    addFlashcard: (moduleId, flashcard) => {
      setProgress((current) => ({
        ...current,
        flashcardsByModule: {
          ...current.flashcardsByModule,
          [moduleId]: [...(current.flashcardsByModule[moduleId] ?? []), flashcard],
        },
      }));
    },
    saveModuleNotes: (moduleId, notes) => {
      setProgress((current) => ({
        ...current,
        notesByModule: {
          ...current.notesByModule,
          [moduleId]: notes,
        },
      }));
    },
    resetProgress: () => {
      setProgress((current) => createFreshProgress(current.learnerId, current.displayName, true, current.gradeLevel));
    },
    createFreshLearner: (displayName, gradeLevel) => {
      const freshLearnerId = generateLearnerId();
      const nextProgress = createFreshProgress(freshLearnerId, displayName, true, gradeLevel ?? null);
      setLearnerId(freshLearnerId);
      setProgress(nextProgress);
    },
    markOnboarded: () => {
      setProgress((current) => ({ ...current, hasOnboarded: true }));
    },
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

