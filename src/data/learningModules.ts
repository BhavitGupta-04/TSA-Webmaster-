export interface LearningModule {
  id: string;
  title: string;
  description: string;
  xp: number;
  badgeId: string;
  minutes: number;
  outcome: string;
  concepts: { title: string; body: string; example: string }[];
  scenario: { prompt: string; explanation: string };
  mission: string;
  questions: { prompt: string; options: string[]; answer: number; explanation: string }[];
  resources: { title: string; publisher: string; url: string; description: string }[];
}

export const learningModules: LearningModule[] = [
  {
    id: 'fundamentals', title: 'AI Fundamentals',
    description: 'Go behind the output. Discover how data becomes a prediction, and why a confident answer can still be wrong.',
    xp: 150, badgeId: 'ai-fundamentals', minutes: 12,
    outcome: 'Explain the difference between training a model and using one.',
    concepts: [
      { title: 'AI is a field. Machine learning is one approach.', body: 'Artificial intelligence includes systems that perform tasks such as recognizing speech, planning, or generating text. Machine learning builds models using examples instead of requiring a person to write every rule.', example: 'A hand-written spam rule blocks a specific phrase. A learned spam filter finds patterns across many labeled messages.' },
      { title: 'Training comes before prediction', body: 'During training, a model adjusts its internal parameters using data. During inference, it uses what it learned to respond to a new input. An ordinary conversation does not necessarily retrain the model.', example: 'Train a recycling classifier on labeled photos of cans and bottles. Then test it on photos it has never seen before.' },
      { title: 'A prediction is not a guarantee', body: 'Generative AI produces content using learned patterns. A fluent response can contain invented facts or citations, often called hallucinations. Check important claims against reliable sources.', example: 'If a chatbot names a study for your lab report, find and read the actual study before citing it.' },
    ],
    scenario: { prompt: 'A recycling model does well on its training photos but struggles with photos from your cafeteria. What would you investigate?', explanation: 'Check lighting, camera angles, backgrounds, and the objects represented in training. Test on separate cafeteria photos. Success on familiar examples does not guarantee success on new ones.' },
    mission: 'Sketch a recycling helper for your school. Name its input, its output, and two situations where a person should check its prediction.',
    questions: [
      { prompt: 'A model examines a new photo after training. Which step is this?', options: ['Labeling the training data', 'Inference', 'Retraining from scratch'], answer: 1, explanation: 'Inference means using an already trained model on a new input.' },
      { prompt: 'Which test best checks whether a recycling model works beyond its training examples?', options: ['Test on separate, previously unseen photos', 'Show it the training photos again', 'Count how many parameters it has'], answer: 0, explanation: 'Unseen examples help reveal whether the model learned useful patterns beyond the examples it practiced on.' },
      { prompt: 'A chatbot gives you a convincing quotation for an essay. What should you do next?', options: ['Trust it because it sounds specific', 'Ask it to sound more confident', 'Find the original source and verify the quotation'], answer: 2, explanation: 'Plausible wording is not evidence. Verify the quotation and its context in the original source.' },
    ],
    resources: [{ title: 'What is machine learning?', publisher: 'Google for Developers', url: 'https://developers.google.com/machine-learning/intro-to-ml/what-is-ml', description: 'Explore prediction, classification, and the major approaches to machine learning.' }],
  },
  {
    id: 'tools', title: 'Practical AI Tools',
    description: 'Turn a vague question into a useful prompt, then evaluate the answer instead of just accepting it.',
    xp: 180, badgeId: 'ai-tools', minutes: 15,
    outcome: 'Write a focused study prompt and describe how you would check the response.',
    concepts: [
      { title: 'Give the task a clear shape', body: 'A useful prompt describes your task, relevant context, and the format you need. Add constraints that support learning, such as asking for a hint before the full solution.', example: 'Instead of "help with biology," try "Quiz me on mitosis at a tenth-grade level. Ask one question at a time and explain mistakes after I answer."' },
      { title: 'Inspect, then improve', body: 'Read the first response critically. Is it at the right level? Does it answer the question? Ask for a specific revision and compare the results. More detailed instructions can help, but cannot guarantee accuracy.', example: 'If an explanation uses unfamiliar vocabulary, ask for definitions and one worked example. Then explain the idea yourself.' },
      { title: 'Make verification part of the task', body: 'Check factual claims using your textbook or an authoritative source. Recalculate numbers. A link or citation is a lead to investigate, not proof that the answer is correct.', example: 'For a history timeline, verify each date and make sure the linked source actually supports the event being described.' },
    ],
    scenario: { prompt: 'You ask for algebra help and receive the full answer immediately. How could you change your prompt to protect your own learning?', explanation: 'Ask for one hint at a time, attempt the step yourself, and request feedback on your reasoning. Follow your teacher\'s rules for AI assistance.' },
    mission: 'Write a prompt for a subject you are studying. Include the topic, grade level, response format, and one way you will check the output.',
    questions: [
      { prompt: 'Which prompt best supports active practice?', options: ['Finish my worksheet', 'Ask me one chemistry question at a time and wait for my answer', 'Tell me everything about chemistry'], answer: 1, explanation: 'A clear topic and a wait-for-my-answer instruction make room for you to think and practice.' },
      { prompt: 'An AI answer includes a link to a scientific article. What establishes support for its claim?', options: ['The link looks professional', 'The answer repeats the claim twice', 'Reading the article and checking that it supports the claim'], answer: 2, explanation: 'A citation can be incorrect or irrelevant. Read the source and compare it with the claim.' },
      { prompt: 'An explanation is too advanced. What is a useful next step?', options: ['Request simpler definitions and a worked example', 'Assume the topic is impossible', 'Copy the answer without understanding it'], answer: 0, explanation: 'Specific feedback helps adapt the explanation. You still need to check and understand the result.' },
    ],
    resources: [{ title: 'AI for education', publisher: 'Khan Academy', url: 'https://www.khanacademy.org/college-careers-more/ai-for-education', description: 'Explore additional lessons about AI and learning. Some activities may require an account.' }],
  },
  {
    id: 'ethics', title: 'Ethical AI Use',
    description: 'Look beyond whether a tool works. Ask who it works for, what information it needs, and who is responsible.',
    xp: 200, badgeId: 'ai-ethics', minutes: 12,
    outcome: 'Identify a fairness or privacy risk and propose a concrete safeguard.',
    concepts: [
      { title: 'Ask who is missing', body: 'Data and design choices can produce unfair outcomes. An overall accuracy number can hide much worse performance for a particular group. Examine whose experiences are represented and whose are missing.', example: 'A speech tool tested mostly on one accent may work poorly for students with other accents. Evaluate performance across the people who will use it.' },
      { title: 'Use less personal information', body: 'Before sharing information with a tool, consider whether it is necessary and whether you have permission. Use fictional or anonymized examples for practice instead of classmates\' private details.', example: 'To draft a sample study schedule, use fictional subjects and times instead of uploading someone else\'s grades and contact details.' },
      { title: 'Keep people accountable', body: 'Be transparent about AI assistance and follow assignment expectations. People need ways to question consequential decisions; a model\'s answer should not end the conversation.', example: 'If an AI tool flags an essay as suspicious, a teacher should examine evidence and hear from the student rather than treating the flag as proof.' },
    ],
    scenario: { prompt: 'Your club wants an AI tool to select scholarship winners using past winners as examples. What could go wrong?', explanation: 'Past selections may reflect unequal access or biased decisions. Review the criteria, examine outcomes across groups, and ensure accountable human review and a way to challenge mistakes.' },
    mission: 'Draft three rules for a classroom AI helper: one about privacy, one about fairness, and one about explaining how AI was used.',
    questions: [
      { prompt: 'A speech tool has high average accuracy. What else should you check?', options: ['Whether its logo looks trustworthy', 'Whether everyone likes its name', 'How well it works for students with different accents'], answer: 2, explanation: 'An average can hide differences. Evaluate the tool across the people and contexts it is meant to serve.' },
      { prompt: 'You need sample student data for a demonstration. Which is the best starting point?', options: ['Fictional records without real personal details', 'A classmate\'s private report card', 'Your class contact list'], answer: 0, explanation: 'Fictional data lets you demonstrate the idea without exposing another person\'s information.' },
      { prompt: 'An AI detector flags a student\'s essay. What is the responsible response?', options: ['Automatically punish the student', 'Review the evidence and let the student explain their process', 'Publish the student\'s name'], answer: 1, explanation: 'A tool can be wrong. Human review and an opportunity to respond are necessary before drawing conclusions.' },
    ],
    resources: [{ title: 'Ethics of artificial intelligence', publisher: 'UNESCO', url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics', description: 'Read about fairness, transparency, privacy, and human oversight.' }],
  },
  {
    id: 'creativity', title: 'Creative AI',
    description: 'Use AI to explore possibilities while keeping your own purpose, decisions, and voice at the center.',
    xp: 220, badgeId: 'ai-creativity', minutes: 15,
    outcome: 'Plan a creative workflow that includes human revision and disclosure.',
    concepts: [
      { title: 'Start with your own brief', body: 'Define your audience, purpose, and constraints before asking for ideas. A creative brief gives you criteria for judging suggestions instead of accepting the first output.', example: 'For a school recycling poster, specify the audience, the one action you want people to take, and the space available for text.' },
      { title: 'Explore, choose, and revise', body: 'Generate several directions, compare them against your brief, and develop your own version. Check details and consider who might be excluded or misrepresented.', example: 'Compare a humorous poster with a fact-based one. Choose a direction, rewrite the headline, and check that the text is readable from a distance.' },
      { title: 'Show your process', body: 'Keep your sketches, prompts, and revisions. Explain what AI contributed and what you changed. Follow the project\'s attribution requirements and use assets you have permission to use.', example: 'A process note might say: "AI helped brainstorm headlines. I wrote the final text, drew the illustrations, and checked the facts."' },
    ],
    scenario: { prompt: 'Your AI-generated event poster looks polished, but the date is wrong and the lettering is hard to read. Is it ready to share?', explanation: 'No. Compare it with the brief, correct the date using the event organizer\'s information, and test readability. A polished appearance does not establish accuracy or usefulness.' },
    mission: 'Create a brief for a school event poster. Sketch two directions, choose one, and write a short note describing any AI assistance.',
    questions: [
      { prompt: 'What should guide your choice between three AI-generated poster ideas?', options: ['Which one was generated first', 'Which best fits your audience, purpose, and constraints', 'Which has the most visual effects'], answer: 1, explanation: 'Your creative brief gives you meaningful criteria for choosing and improving a direction.' },
      { prompt: 'A generated poster includes event details. What should you do before sharing it?', options: ['Verify details and test readability', 'Assume polished design means accurate content', 'Only change the background color'], answer: 0, explanation: 'Creative output needs review for both factual accuracy and whether people can use it.' },
      { prompt: 'Which process note is most transparent?', options: ['"No tools were used," even though AI helped', '"The computer made it"', '"AI suggested headlines; I rewrote the final text and created the layout"'], answer: 2, explanation: 'Describe the specific assistance and your own contribution so others can understand your process.' },
    ],
    resources: [{ title: 'Generative AI: inputs and outputs', publisher: 'Google for Developers', url: 'https://developers.google.com/machine-learning/intro-to-ml/what-is-ml#generative_ai', description: 'See how generative models work with text, images, and other media.' }],
  },
];
