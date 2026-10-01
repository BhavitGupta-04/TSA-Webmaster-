// Every photograph on this site, in one place. The Sources page reads from this
// list, so a photo cannot appear on the site without its credit appearing too.
//
// All eight are from Pexels. The Pexels License allows free use and modification
// without attribution; we credit the photographers anyway. Each file was
// downloaded once and is served from /public/photos rather than hot-linked.

export interface SitePhotoCredit {
  /** Key used by <SitePhoto id="..." />. */
  id: string;
  /** Path under /public. */
  file: string;
  /** Title as published on Pexels. */
  title: string;
  photographer: string;
  /** The photo's page on Pexels. */
  url: string;
  /** Description for screen readers. Says what is in the frame, not why it is here. */
  alt: string;
  /** Where it appears, for the credits page. */
  usedOn: string;
}

export const photoLibrary = {
  source: 'Pexels',
  siteUrl: 'https://www.pexels.com',
  license: 'Pexels License',
  licenseUrl: 'https://www.pexels.com/license/',
  licenseSummary:
    'Free to download and use, including on a website, with or without changes. Attribution is welcomed but not required. Photos may not be sold unaltered, and the people in them may not be shown in a way that suggests they endorse anything.',
};

export const sitePhotos: SitePhotoCredit[] = [
  {
    id: 'students-collaborating',
    file: '/photos/students-collaborating.jpg',
    title: 'Diverse Group of Students Collaborating Inside',
    photographer: 'Muhammad Jawadur Rahman',
    url: 'https://www.pexels.com/photo/diverse-group-of-students-collaborating-inside-32074907/',
    alt: 'Three students sitting at a long table, reading a printed page together next to an open laptop.',
    usedOn: 'About',
  },
  {
    id: 'classroom-laptops',
    file: '/photos/classroom-laptops.jpg',
    title: 'A Two Girls Using Laptop with Classmates',
    photographer: 'Max Fischer',
    url: 'https://www.pexels.com/photo/a-two-girls-using-laptop-with-classmates-5212695/',
    alt: 'Six students gathered around two laptops in a classroom while a teacher watches over their shoulders.',
    usedOn: 'About',
  },
  {
    id: 'writing-feedback',
    file: '/photos/writing-feedback.jpg',
    title: 'Photo of Woman Writing on Notebook',
    photographer: 'RF._.studio',
    url: 'https://www.pexels.com/photo/photo-of-woman-writing-on-notebook-3059749/',
    alt: 'A person writing by hand in a lined notebook, with a stack of books on the desk beside them.',
    usedOn: 'Contact',
  },
  {
    id: 'robotic-arm',
    file: '/photos/robotic-arm.jpg',
    title: 'Close-up of Modern Robotic Mechanism',
    photographer: 'KJ Brix',
    url: 'https://www.pexels.com/photo/close-up-of-modern-robotic-mechanism-16544054/',
    alt: 'Close-up of a robotic arm with a two-pronged metal gripper, against a blurred workshop background.',
    usedOn: 'Curriculum — Chapter 01',
  },
  {
    id: 'study-notes',
    file: '/photos/study-notes.jpg',
    title: 'Crop smart girl studying with notepad and laptop',
    photographer: 'Katerina Holmes',
    url: 'https://www.pexels.com/photo/crop-smart-girl-studying-with-notepad-and-laptop-5905885/',
    alt: 'A student seen from behind, writing in a spiral notepad with a pencil, an open laptop on the desk ahead.',
    usedOn: 'Curriculum — Chapter 02',
  },
  {
    id: 'workshop-discussion',
    file: '/photos/workshop-discussion.jpg',
    title: 'Diverse Group in an Engaging Indoor Workshop',
    photographer: 'Matheus Bertelli',
    url: 'https://www.pexels.com/photo/diverse-group-in-an-engaging-indoor-workshop-33714873/',
    alt: 'A row of people seated in a bright room, one of them speaking and gesturing while the others listen.',
    usedOn: 'Curriculum — Chapter 03',
  },
  {
    id: 'creative-tablet',
    file: '/photos/creative-tablet.jpg',
    title: 'Woman Sketching in Drawing Tablet',
    photographer: 'Weavehall Collective',
    url: 'https://www.pexels.com/photo/woman-sketching-in-drawing-tablet-20515573/',
    alt: 'A person drawing a pencil-style sketch on a tablet screen with a stylus.',
    usedOn: 'Curriculum — Chapter 04',
  },
  {
    id: 'reading-shelf',
    file: '/photos/reading-shelf.jpg',
    title: 'Assorted Books',
    photographer: 'Lisa Fotios',
    url: 'https://www.pexels.com/photo/assorted-books-2923463/',
    alt: 'Two crowded shelves of hardback books in warm light, with a palm leaf in the foreground.',
    usedOn: 'Reading List',
  },
];

export const photoById = Object.fromEntries(sitePhotos.map((photo) => [photo.id, photo])) as Record<
  string,
  SitePhotoCredit
>;
