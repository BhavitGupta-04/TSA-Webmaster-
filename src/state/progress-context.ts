import { createContext } from 'react';
import type { LearningProgress, ProgressActions } from '../types/learning';

export const ProgressContext = createContext<(LearningProgress & ProgressActions) | null>(null);