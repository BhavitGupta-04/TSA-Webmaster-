export interface LessonReference {
  id: string;
  title: string;
  creator: string;
  focus: string;
  note: string;
  prompt: string;
  lessonIds: string[];
}

export const lessonReferences: LessonReference[] = [
  {
    id: 'KHbwOetbmbs',
    title: 'What is Machine Learning?',
    creator: 'Code.org / CodeAI',
    focus: 'Machine learning and how examples help a system make predictions.',
    note: 'A short introduction from Code.org. Use it as another explanation, then compare its examples with the school situations in Signal Lab.',
    prompt: 'What is one example of learning from data, and what would you test before trusting its predictions?',
    lessonIds: ['patterns', 'test-detective'],
  },
  {
    id: '9x7srNK_i1Q',
    title: 'Using AI Wisely for School Success',
    creator: 'Common Sense Education',
    focus: 'Practical ways to think about AI tools in school.',
    note: 'A school-focused perspective. Check your teacher’s directions and your school’s rules before using any tool for an assignment.',
    prompt: 'How could AI help you practice while keeping the thinking and final explanation your own?',
    lessonIds: ['prompt-builder', 'fact-checker', 'creative-brief'],
  },
  {
    id: 'w_3L1Bf2P_g',
    title: 'Introduction to Responsible AI',
    creator: 'Google Cloud',
    focus: 'Responsible AI principles and questions to consider when using AI systems.',
    note: 'This 2024 introduction presents one organization’s perspective. Compare its ideas with the people and school scenarios in these lessons.',
    prompt: 'Who might be affected by a school AI tool, and what safeguard could help?',
    lessonIds: ['fairness', 'privacy', 'capstone'],
  },
];

export function referenceForLesson(lessonId: string): LessonReference | undefined {
  return lessonReferences.find(reference => reference.lessonIds.includes(lessonId));
}
