import { createContext, useContext } from 'react';
import type { LearningProgress, ProgressActions } from '../types/learning';

export const ProgressContext = createContext<(LearningProgress & ProgressActions) | null>(null);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
