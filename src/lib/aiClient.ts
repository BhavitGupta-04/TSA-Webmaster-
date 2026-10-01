/**
 * The AI adapter for "Ask Signal".
 *
 * ──────────────────────────────────────────────────────────────────────────────
 *  THIS IS THE ONE FILE TO EDIT WHEN YOU CONNECT A MODEL.
 *
 *  Nothing else in the app knows how an answer is produced. The chat panel
 *  calls `askSignal()` and renders whatever comes back, so swapping the guide
 *  below for a live model is a change to this file alone.
 *
 *  Right now `askSignal` answers from `guideResponses` — a hand-written set of
 *  replies about this site. Every answer is real, nothing is invented, and the
 *  assistant says plainly when a question is outside what it knows.
 *
 *  TO CONNECT A MODEL:
 *
 *    1. Set MODE to 'live' below.
 *    2. Add the endpoint to .env as VITE_ASSISTANT_ENDPOINT. It should point at
 *       OUR backend, not at the model provider.
 *    3. Add that route to Django. It holds the API key, adds SYSTEM_PROMPT,
 *       and forwards to the provider:
 *
 *         POST /api/v1/assistant/
 *         body  { messages: [{ role, content }, ...] }
 *         200   { reply: "...", suggestions?: ["...", ...] }
 *
 *       The key must live on the server. A key shipped in this bundle is a
 *       public key — anyone can read it in devtools and spend it.
 *    4. `callLiveModel` below already speaks that shape. Nothing else changes.
 *
 *  Keep in mind when it goes live:
 *    · Say on screen that messages leave the device. Students are told to
 *      check where their data goes; this site should hold itself to that.
 *    · Do not send a learner's name, grade, or notes. `buildPayload` only
 *      sends the conversation.
 *    · Rate-limit on the server. A public endpoint with a key behind it will
 *      be found.
 * ──────────────────────────────────────────────────────────────────────────────
 */

export const MODE: 'guide' | 'live' = 'guide';

const ENDPOINT = import.meta.env.VITE_ASSISTANT_ENDPOINT ?? '/api/v1/assistant/';

/**
 * Sent with every live request. Written for a school audience: it should not
 * do the assignment, and it should admit what it does not know.
 */
export const SYSTEM_PROMPT = `You are the study guide for Signal Lab, an AI learning portal for students in grades 9-12.

Explain ideas in plain language and keep answers short — a few sentences, unless asked for more.
Point students to the part of the site that covers their question: the four chapters at /curriculum,
the hands-on experiments at /playground, or the five-point checklist at /field-guide.

Help students think; do not do their homework. If someone asks you to write an essay or finish a
worksheet, offer a plan, a hint, or practice questions instead, and remind them to follow their
teacher's rules about AI.

If you do not know something, say so. Never invent a source, a quotation, or a statistic.`;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  /** Follow-up questions offered as chips under the reply. */
  suggestions?: string[];
  /** Somewhere on this site that answers the question more fully. */
  link?: { label: string; to: string };
}

export const OPENING_MESSAGE: Omit<ChatMessage, 'id'> = {
  role: 'assistant',
  content:
    "Hi. I'm the Signal Lab guide — I can point you to the right lesson, explain a term, or help you shape a question before you take it to a real AI tool.\n\nI'm not connected to an AI model yet, so I answer from a written guide to this site.",
  suggestions: ['What is machine learning?', 'How do I write a good prompt?', 'Can I use AI for homework?', 'How do I earn XP?'],
};

/**
 * Matched in order; the first rule with any matching keyword wins. Order is the
 * tie-breaker, so the narrow rules are listed before the broad ones.
 */
interface GuideRule {
  keywords: string[];
  reply: string;
  suggestions?: string[];
  link?: { label: string; to: string };
}

const guideResponses: GuideRule[] = [
  {
    keywords: ['machine learning', 'what is ai', 'what is a model', 'how does ai work', 'neural net', 'how do models', 'how does a model'],
    reply:
      'Machine learning is how a program picks up a pattern from examples instead of being handed a rule for every case.\n\nShow it a few thousand labelled photos of cans and bottles and it works out which features separate them. Nobody wrote "a can is cylindrical" — that came out of the examples. Which is also why a model trained on tidy photos can fall apart on messy ones.\n\nChapter 01 covers this, and the Playground has a tiny classifier you can push around.',
    suggestions: ['What is training vs inference?', 'Why does AI get things wrong?'],
    link: { label: 'Open Chapter 01', to: '/learn?module=fundamentals' },
  },
  {
    keywords: ['training', 'inference', 'trained'],
    reply:
      'Training is when the model adjusts itself using data. Inference is when it uses what it already learned to answer something new.\n\nChatting with a model is inference — your message usually is not teaching it anything. That trips people up: asking it to "remember" something mid-conversation works only until the conversation ends.',
    link: { label: 'Open Chapter 01', to: '/learn?module=fundamentals' },
  },
  {
    keywords: ['hallucinat', 'get things wrong', 'gets it wrong', 'make up', 'made up', 'made-up', 'false', 'lying', 'lie', 'inaccurate', 'why is it wrong'],
    reply:
      'A model predicts text that reads like a good answer. Usually a true answer and a plausible answer are the same thing — but not always, and the model cannot tell the difference from the inside.\n\nThat is why a made-up citation sounds exactly as confident as a real one. Treat any specific claim — a date, a number, a quotation, a source — as something to check before you use it.',
    suggestions: ['How do I check an AI answer?'],
    link: { label: 'Open the Field Guide', to: '/field-guide' },
  },
  {
    keywords: ['prompt'],
    reply:
      'A prompt works better when it carries four things: the task, enough context, the format you want, and a constraint that keeps you thinking.\n\nSo instead of "help with biology", try: "Quiz me on mitosis at a 10th-grade level. One question at a time, wait for my answer, then tell me what I missed."\n\nThe second one makes you do the recall. That is the whole difference.',
    suggestions: ['Can I use AI for homework?'],
    link: { label: 'Build one in the Playground', to: '/playground#prompt-builder' },
  },
  {
    keywords: ['homework', 'cheat', 'assignment', 'essay', 'plagiar', 'am i allowed', 'is it allowed', 'schoolwork', 'school work'],
    reply:
      "Your teacher's rule for that specific assignment is the one that counts — it changes from class to class, so ask.\n\nWhere AI is allowed, the line that holds up well: use it for questions, feedback, and brainstorming, and keep the reasoning and the final words yours. Having it explain a concept you then write up yourself is different from having it write the thing.\n\nIf you did use it, say so. Being able to describe what you used it for is usually what separates help from trouble.",
    link: { label: 'Open the Field Guide', to: '/field-guide' },
  },
  {
    keywords: ['check an answer', 'check the answer', 'fact check', 'verify', 'how do i check', 'citation', 'source'],
    reply:
      'Open the source. Not the link — the actual page — and look for the sentence the AI claims is there.\n\nFake citations tend to look right: real journal, real author, plausible title, wrong or nonexistent paper. Same for numbers; recalculate anything that matters. A link is a lead, not proof.',
    link: { label: 'Open the Field Guide', to: '/field-guide' },
  },
  {
    keywords: ['bias', 'biased', 'fair', 'unfair', 'discriminat', 'left out', 'represent'],
    reply:
      'Bias usually arrives through the data. If a speech tool was tested mostly on one accent, it will work worse for everyone else — and the overall accuracy number will still look fine, because the people it fails are a small slice of the test set.\n\nSo the useful question is not "is it accurate?" but "who is it accurate for?" Chapter 03 works through this.',
    suggestions: ['What about privacy?'],
    link: { label: 'Open Chapter 03', to: '/learn?module=ethics' },
  },
  {
    keywords: ['privacy', 'private', 'personal data', 'my data', 'is it safe', 'track me', 'store my'],
    reply:
      "Two separate things here.\n\nThis site: your name, grade, notes, flashcards, and progress stay in this browser. There is no account and nothing is uploaded. Clear your browser data and it is gone.\n\nAI tools generally: assume anything you paste may be read or kept. Keep out passwords, student records, private messages, and other people's details. Use made-up examples when you are just testing a prompt.",
    link: { label: 'How we handle data', to: '/about#privacy' },
  },
  {
    keywords: ['xp', 'badge', 'points', 'my progress', 'level', 'streak', 'rank', 'certificate'],
    reply:
      'Finish a chapter quiz with at least 2 of 3 right and you earn that chapter\'s XP and badge. All four comes to 750 XP.\n\nXP is awarded once per chapter, but retaking a quiz can still raise your best score. Your rank goes up as XP accumulates, and your dashboard tracks a day streak for coming back.',
    link: { label: 'See your dashboard', to: '/portal' },
  },
  {
    keywords: ['where do i start', 'where should i start', 'how do i start', 'getting started', 'where to begin', 'what should i do first'],
    reply:
      'Chapter 01 if you want the ideas in order. The Playground if you would rather poke at something first and read after — plenty of people learn better that way.\n\nNo account needed either way.',
    suggestions: ['What is machine learning?'],
    link: { label: 'Start Chapter 01', to: '/learn?module=fundamentals' },
  },
  {
    keywords: ['book', 'reading list', 'shop', 'buy', 'cart', 'purchase'],
    reply:
      'There are eight books on the Reading List, sorted by how much background they assume. If you want one place to start, Janelle Shane\'s "You Look Like a Thing and I Love You" is genuinely funny and explains more than it lets on.\n\nFair warning: the shop is a demonstration. The cart and checkout work, but no payment is taken and nothing ships. Borrow these from a library.',
    link: { label: 'Open the Reading List', to: '/reading-list' },
  },
  {
    keywords: ['creative', 'art', 'image gen', 'design', 'poster', 'music', 'drawing'],
    reply:
      'Write your brief before you generate anything — who it is for, what you want them to do, what constraints you are under. Without it you end up picking whichever output looks shiniest rather than whichever one works.\n\nThen generate several, judge them against the brief, and rebuild the one that is closest. Keep your prompts and drafts; being able to show the process is what makes the work defensibly yours.',
    link: { label: 'Open Chapter 04', to: '/learn?module=creativity' },
  },
  {
    keywords: ['who made', 'who built', 'about you', 'what are you', 'who are you', 'tsa', 'competition', 'signal lab'],
    reply:
      'Signal Lab is a student project built for the TSA Webmaster competition — an AI learning portal for grades 9 to 12.\n\nI am a scripted guide, not an AI model. The responses I give were written by hand so the site works without sending anything to a server. The hook-up point for a real model is ready in the code.',
    link: { label: 'About the project', to: '/about' },
  },
];

function findGuideReply(question: string) {
  const text = question.toLowerCase();
  return guideResponses.find((rule) => rule.keywords.some((word) => text.includes(word)));
}

/** Builds the request body. The conversation only — no profile, no progress. */
function buildPayload(history: ChatMessage[], question: string) {
  return {
    system: SYSTEM_PROMPT,
    messages: [
      ...history.slice(-8).map(({ role, content }) => ({ role, content })),
      { role: 'user' as const, content: question },
    ],
  };
}

async function callLiveModel(history: ChatMessage[], question: string) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildPayload(history, question)),
  });
  if (!response.ok) throw new Error(`Assistant endpoint returned ${response.status}`);
  return (await response.json()) as { reply: string; suggestions?: string[] };
}

export interface AskResult {
  content: string;
  suggestions?: string[];
  link?: { label: string; to: string };
}

export async function askSignal(history: ChatMessage[], question: string): Promise<AskResult> {
  if (MODE === 'live') {
    try {
      const data = await callLiveModel(history, question);
      return { content: data.reply, suggestions: data.suggestions };
    } catch {
      return {
        content: "I couldn't reach the assistant service just now. Try again in a moment.",
      };
    }
  }

  // Short pause so replies do not snap in faster than they can be read.
  await new Promise((resolve) => setTimeout(resolve, 420));

  const match = findGuideReply(question);
  if (match) {
    return { content: match.reply, suggestions: match.suggestions, link: match.link };
  }

  return {
    content:
      "That one's outside my written guide — I'm not connected to an AI model yet, so I only cover this site and the ideas in it.\n\nTry me on how models learn, writing prompts, checking an answer, bias and privacy, or using AI for schoolwork.",
    suggestions: ['What is machine learning?', 'How do I write a good prompt?', 'Can I use AI for homework?'],
  };
}
