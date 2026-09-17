export interface LearningProgress {
  displayName: string;
  xp: number;
  completedModules: string[];
  earnedBadges: string[];
}

export interface ProgressActions {
  updateDisplayName: (displayName: string) => void;
  completeModule: (moduleId: string, xp: number, badgeId?: string) => void;
  resetProgress: () => void;
}