/**
 * XP ranks and the day streak.
 *
 * The four modules total 750 XP, so the tiers are spaced to make the first one
 * reachable from a single quiz and the last one require the whole path.
 */

export interface Rank {
  id: string;
  title: string;
  minXp: number;
  /** Shown on the dashboard under the rank name. */
  note: string;
}

export const ranks: Rank[] = [
  { id: 'curious', title: 'Curious', minXp: 0, note: 'You opened the door. That counts.' },
  { id: 'apprentice', title: 'Apprentice', minXp: 150, note: 'One chapter down. The vocabulary is starting to stick.' },
  { id: 'analyst', title: 'Analyst', minXp: 330, note: 'You can take an answer apart now instead of just reading it.' },
  { id: 'strategist', title: 'Strategist', minXp: 530, note: 'Three chapters. You are asking the questions the lessons used to ask you.' },
  { id: 'signal', title: 'Signal', minXp: 750, note: 'All four. You know enough to teach someone else — which is the real test.' },
];

export function rankFor(xp: number) {
  const index = ranks.reduce((found, rank, position) => (xp >= rank.minXp ? position : found), 0);
  const current = ranks[index];
  const next = ranks[index + 1] ?? null;

  const span = next ? next.minXp - current.minXp : 0;
  const into = xp - current.minXp;

  return {
    rank: current,
    next,
    /** Percent of the way to the next rank; 100 once there is no next rank. */
    percentToNext: next ? Math.min(100, Math.round((into / span) * 100)) : 100,
    xpToNext: next ? Math.max(0, next.minXp - xp) : 0,
    position: index + 1,
    total: ranks.length,
  };
}

/** Local calendar date as YYYY-MM-DD, so a streak rolls over at the learner's midnight. */
export function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function daysBetween(from: string, to: string) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

/**
 * Works out the streak for a visit today.
 * Yesterday continues it, today leaves it alone, anything older restarts it.
 */
export function nextStreak(lastVisit: string | null, currentStreak: number) {
  const now = today();
  if (!lastVisit) return { streak: 1, lastVisit: now, changed: true };

  const gap = daysBetween(lastVisit, now);
  if (gap === 0) return { streak: Math.max(1, currentStreak), lastVisit, changed: false };
  if (gap === 1) return { streak: Math.max(1, currentStreak) + 1, lastVisit: now, changed: true };
  return { streak: 1, lastVisit: now, changed: true };
}
