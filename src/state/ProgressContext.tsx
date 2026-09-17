import { useEffect, useState, type ReactNode } from 'react';
import type { LearningProgress, ProgressActions } from '../types/learning';
import { ProgressContext } from './progress-context';

const STORAGE_KEY = 'ai-learning-portal-progress';

const initialProgress: LearningProgress = {
  displayName: 'Student',
  xp: 0,
  completedModules: [],
  earnedBadges: [],
};

function readProgress(): LearningProgress {
  if (typeof window === 'undefined') return initialProgress;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialProgress;

    const parsed = JSON.parse(saved) as Partial<LearningProgress>;
    return {
      displayName: typeof parsed.displayName === 'string' ? parsed.displayName : initialProgress.displayName,
      xp: typeof parsed.xp === 'number' && parsed.xp >= 0 ? parsed.xp : initialProgress.xp,
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules.filter((id): id is string => typeof id === 'string') : [],
      earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges.filter((id): id is string => typeof id === 'string') : [],
    };
  } catch {
    return initialProgress;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LearningProgress>(readProgress);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

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
        };
      });
    },
    resetProgress: () => setProgress(initialProgress),
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}
