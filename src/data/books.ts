// The Reading List catalogue.
//
// These are real, published books. Titles, authors, publishers, years, and ISBNs
// are factual references so you can find a copy at a library or a bookshop — we
// reproduce no cover art and no text from inside them. Covers on the shop page
// are typography we set in CSS.
//
// Prices are list prices rounded to the usual paperback range, used to make the
// cart arithmetic real. Nothing on this site takes a payment. See CHECKOUT_MODE
// in src/lib/checkout.ts for where a real payment processor would attach.

export type BookLevel = 'Start here' | 'Go deeper' | 'For the debate team';

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  /** Price in cents, so arithmetic never hits a floating-point rounding bug. */
  priceCents: number;
  level: BookLevel;
  /** Which learning module this book extends. */
  pairsWith: string;
  blurb: string;
  /** Two-tone cover, drawn in CSS from these. */
  cover: { bg: string; ink: string; accent: string };
}

export const bookCatalog: Book[] = [
  {
    id: 'thing-love-you',
    title: 'You Look Like a Thing and I Love You',
    subtitle: 'How AI Works and Why It’s Making the World a Weirder Place',
    author: 'Janelle Shane',
    publisher: 'Voracious',
    year: 2019,
    isbn: '9780316525220',
    priceCents: 1799,
    level: 'Start here',
    pairsWith: 'fundamentals',
    blurb:
      'A research scientist feeds neural networks bad ideas on purpose — pickup lines, recipes, paint colors — and the failures teach you more about how models work than most textbooks do.',
    cover: { bg: '#2f5f4a', ink: '#f5f5f0', accent: '#c39c56' },
  },
  {
    id: 'thinking-humans',
    title: 'Artificial Intelligence',
    subtitle: 'A Guide for Thinking Humans',
    author: 'Melanie Mitchell',
    publisher: 'Farrar, Straus and Giroux',
    year: 2019,
    isbn: '9780374257835',
    priceCents: 1899,
    level: 'Go deeper',
    pairsWith: 'fundamentals',
    blurb:
      'A computer scientist walks through what AI can actually do, what it only appears to do, and why the gap between the two keeps surprising the people who build it.',
    cover: { bg: '#1f3b4d', ink: '#f2f6f7', accent: '#6fb3c0' },
  },
  {
    id: 'hello-world',
    title: 'Hello World',
    subtitle: 'Being Human in the Age of Algorithms',
    author: 'Hannah Fry',
    publisher: 'W. W. Norton & Company',
    year: 2018,
    isbn: '9780393634990',
    priceCents: 1699,
    level: 'Start here',
    pairsWith: 'ethics',
    blurb:
      'Algorithms already decide sentences, diagnoses, and what you see online. Fry asks the question this site keeps returning to: when should a person overrule the machine?',
    cover: { bg: '#b8452f', ink: '#fff6ec', accent: '#f0c75e' },
  },
  {
    id: 'co-intelligence',
    title: 'Co-Intelligence',
    subtitle: 'Living and Working with AI',
    author: 'Ethan Mollick',
    publisher: 'Portfolio / Penguin',
    year: 2024,
    isbn: '9780593716717',
    priceCents: 2099,
    level: 'Start here',
    pairsWith: 'tools',
    blurb:
      'A professor who makes his students use AI on purpose. The practical half of this book is the closest thing there is to a manual for working beside a model instead of hiding it.',
    cover: { bg: '#3f3a68', ink: '#f4f1ff', accent: '#a79bf0' },
  },
  {
    id: 'alignment-problem',
    title: 'The Alignment Problem',
    subtitle: 'Machine Learning and Human Values',
    author: 'Brian Christian',
    publisher: 'W. W. Norton & Company',
    year: 2020,
    isbn: '9780393635829',
    priceCents: 1999,
    level: 'Go deeper',
    pairsWith: 'ethics',
    blurb:
      'What happens when a system optimizes exactly what you asked for and not at all what you meant. Reads like detective work, and it is the best explanation of why "it did what we told it" is not a defense.',
    cover: { bg: '#20343a', ink: '#eef5f3', accent: '#7fc4a8' },
  },
  {
    id: 'weapons-math',
    title: 'Weapons of Math Destruction',
    subtitle: 'How Big Data Increases Inequality and Threatens Democracy',
    author: "Cathy O'Neil",
    publisher: 'Crown',
    year: 2016,
    isbn: '9780553418811',
    priceCents: 1799,
    level: 'For the debate team',
    pairsWith: 'ethics',
    blurb:
      'A mathematician takes apart the scoring systems that rank teachers, borrowers, and job applicants. The chapter on school ratings will change how you read a news story about data.',
    cover: { bg: '#8c2f39', ink: '#fdf0ee', accent: '#e8b4a0' },
  },
  {
    id: 'race-after-technology',
    title: 'Race After Technology',
    subtitle: 'Abolitionist Tools for the New Jim Code',
    author: 'Ruha Benjamin',
    publisher: 'Polity',
    year: 2019,
    isbn: '9781509526406',
    priceCents: 2299,
    level: 'For the debate team',
    pairsWith: 'ethics',
    blurb:
      'A sociologist on how technology that is designed to be neutral can still land unevenly on real people, and what asking "who is missing from this data?" looks like in practice.',
    cover: { bg: '#43306b', ink: '#f6f0ff', accent: '#d7a9e3' },
  },
  {
    id: 'atlas-of-ai',
    title: 'Atlas of AI',
    subtitle: 'Power, Politics, and the Planetary Costs of Artificial Intelligence',
    author: 'Kate Crawford',
    publisher: 'Yale University Press',
    year: 2021,
    isbn: '9780300264630',
    priceCents: 2199,
    level: 'Go deeper',
    pairsWith: 'creativity',
    blurb:
      'Follows AI back to the lithium mines, the labeled datasets, and the warehouses. A useful corrective if you have only ever met AI as a text box on a screen.',
    cover: { bg: '#4a4336', ink: '#f8f4e9', accent: '#d9b96a' },
  },
];

export const bookById = Object.fromEntries(bookCatalog.map((book) => [book.id, book])) as Record<string, Book>;

export const bookLevels: BookLevel[] = ['Start here', 'Go deeper', 'For the debate team'];

export function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
