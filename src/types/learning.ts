export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface LearningProgress {
  learnerId: string;
  displayName: string;
  gradeLevel: number | null;
  xp: number;
  completedModules: string[];
  earnedBadges: string[];
  hasOnboarded: boolean;
  moduleScores: Record<string, number>;
  flashcardsByModule: Record<string, Flashcard[]>;
  notesByModule: Record<string, string>;
  /** Consecutive days with a visit. Counted in the browser, like everything else. */
  streak: number;
  /** YYYY-MM-DD of the last visit, used to work the streak out. */
  lastVisit: string | null;
}

export interface ProgressActions {
  updateDisplayName: (displayName: string) => void;
  completeModule: (moduleId: string, xp: number, badgeId?: string) => void;
  recordModuleScore: (moduleId: string, score: number) => void;
  addFlashcard: (moduleId: string, flashcard: Flashcard) => void;
  saveModuleNotes: (moduleId: string, notes: string) => void;
  resetProgress: () => void;
  createFreshLearner: (displayName: string, gradeLevel?: number) => void;
  markOnboarded: () => void;
}