# Sources & Works Cited — Signal Lab

Every third-party asset used in this site, with its origin, creator, license, and
where it appears. Current as of 2026-10-01.

A visitor-facing version of these credits is published on the site itself at
**`/sources`**, linked from the footer of every public page. That page is built from
`src/data/photos.ts` and `src/data/sources.ts`, so it renders the actual photographs
and icons in use and cannot drift out of sync with the code. This file is the fuller
version, adding the file-by-file usage column and the software list.

---

## 1. Photographs

**All 8 photographs come from Pexels.** Each was downloaded once and is served from
`public/photos/` rather than hot-linked, so the site works offline and the images
cannot change under us.

| Field | Detail |
| --- | --- |
| Library | Pexels |
| License | [Pexels License](https://www.pexels.com/license/) |
| Permitted use | Free to download, use, and modify, including on a website. Attribution is welcomed but not required — we credit every photographer anyway, in the corner of each photo. |
| Not permitted | Selling unaltered copies, and showing identifiable people in a way that implies they endorse something. |

### Photo-by-photo inventory

| File | Title | Photographer | Pexels page | Used on |
| --- | --- | --- | --- | --- |
| `students-collaborating.jpg` | Diverse Group of Students Collaborating Inside | Muhammad Jawadur Rahman | https://www.pexels.com/photo/diverse-group-of-students-collaborating-inside-32074907/ | `/about` |
| `classroom-laptops.jpg` | A Two Girls Using Laptop with Classmates | Max Fischer | https://www.pexels.com/photo/a-two-girls-using-laptop-with-classmates-5212695/ | `/about` |
| `writing-feedback.jpg` | Photo of Woman Writing on Notebook | RF._.studio | https://www.pexels.com/photo/photo-of-woman-writing-on-notebook-3059749/ | `/contact` |
| `robotic-arm.jpg` | Close-up of Modern Robotic Mechanism | KJ Brix | https://www.pexels.com/photo/close-up-of-modern-robotic-mechanism-16544054/ | `/curriculum` ch. 01 |
| `study-notes.jpg` | Crop smart girl studying with notepad and laptop | Katerina Holmes | https://www.pexels.com/photo/crop-smart-girl-studying-with-notepad-and-laptop-5905885/ | `/curriculum` ch. 02 |
| `workshop-discussion.jpg` | Diverse Group in an Engaging Indoor Workshop | Matheus Bertelli | https://www.pexels.com/photo/diverse-group-in-an-engaging-indoor-workshop-33714873/ | `/curriculum` ch. 03 |
| `creative-tablet.jpg` | Woman Sketching in Drawing Tablet | Weavehall Collective | https://www.pexels.com/photo/woman-sketching-in-drawing-tablet-20515573/ | `/curriculum` ch. 04 |
| `reading-shelf.jpg` | Assorted Books | Lisa Fotios | https://www.pexels.com/photo/assorted-books-2923463/ | `/reading-list` |

**Important:** these photographs are illustrative. The people in them are not members
of this team and have no connection to this project. No caption on the site implies
otherwise — that would breach the Pexels License as well as being untrue.

**Citation format for a printed works-cited page (MLA style):**

> Rahman, Muhammad Jawadur. *Diverse Group of Students Collaborating Inside*. Pexels,
> https://www.pexels.com/photo/diverse-group-of-students-collaborating-inside-32074907/.
> Accessed 1 Oct. 2026.

---

## 2. Icons

**All 61 icons in this site come from one open-source library.**

| Field | Detail |
| --- | --- |
| Library | Lucide |
| Version used | `lucide-react` 0.344.0 |
| Creators | Lucide Contributors (2022–present); portions by Cole Bemis, 2013–2022, as part of Feather |
| License | ISC License (Lucide) / MIT (inherited Feather portions) |
| License text | Included in this repo at `licenses/lucide-ISC-LICENSE.txt` |
| Official site | https://lucide.dev |
| Source repository | https://github.com/lucide-icons/lucide |
| Package page | https://www.npmjs.com/package/lucide-react |
| Permitted use | Free to use, copy, modify, and distribute, commercially or not, provided the copyright and permission notice are retained. No on-page attribution is required; keeping the license file satisfies the license. |

### Icon-by-icon inventory

Each icon is used unmodified, sized in code and recolored only through CSS
`currentColor`.

| Icon name | Lucide page | Used in |
| --- | --- | --- |
| Activity | https://lucide.dev/icons/activity | `src/components/PublicSiteChrome.tsx` |
| ArrowDown | https://lucide.dev/icons/arrow-down | `src/pages/LandingPage.tsx` |
| ArrowLeft | https://lucide.dev/icons/arrow-left | `src/pages/CheckoutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/SignupPage.tsx` |
| ArrowRight | https://lucide.dev/icons/arrow-right | `src/components/CartDrawer.tsx`, `src/components/DailyChallenge.tsx`, `src/components/StudioExperiments.tsx`, `src/pages/CheckoutPage.tsx`, `src/pages/CurriculumPage.tsx`, `src/pages/FieldGuidePage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/SignupPage.tsx` |
| ArrowUpRight | https://lucide.dev/icons/arrow-up-right | `src/components/AskSignal.tsx`, `src/components/EverydayAI.tsx`, `src/components/PortalShell.tsx`, `src/components/PublicSiteChrome.tsx`, `src/components/TestimonialsSection.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/CurriculumPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/OrderConfirmedPage.tsx`, `src/pages/PlaygroundPage.tsx`, `src/pages/PortalHomePage.tsx`, `src/pages/ReadingListPage.tsx`, `src/pages/ResourcesPage.tsx`, `src/pages/SourcesPage.tsx` |
| Award | https://lucide.dev/icons/award | `src/components/Certificate.tsx`, `src/components/PortalShell.tsx`, `src/pages/LandingPage.tsx`, `src/pages/PortalHomePage.tsx` |
| BadgeCheck | https://lucide.dev/icons/badge-check | `src/pages/FieldGuidePage.tsx`, `src/pages/SourcesPage.tsx` |
| BookOpen | https://lucide.dev/icons/book-open | `src/components/PortalShell.tsx`, `src/pages/ContactPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/OrderConfirmedPage.tsx`, `src/pages/PortalHomePage.tsx`, `src/pages/ReadingListPage.tsx`, `src/pages/ResourcesPage.tsx` |
| BookOpenCheck | https://lucide.dev/icons/book-open-check | `src/pages/FieldGuidePage.tsx` |
| BrainCircuit | https://lucide.dev/icons/brain-circuit | `src/components/PortalShell.tsx`, `src/pages/LandingPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/PortalHomePage.tsx`, `src/pages/SignupPage.tsx` |
| Check | https://lucide.dev/icons/check | `src/components/StudioExperiments.tsx`, `src/pages/CheckoutPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/PortalHomePage.tsx`, `src/pages/ReadingListPage.tsx` |
| CheckCircle2 | https://lucide.dev/icons/circle-check-big | `src/pages/LearningHubPage.tsx`, `src/pages/OrderConfirmedPage.tsx`, `src/pages/PortalHomePage.tsx` |
| ChevronRight | https://lucide.dev/icons/chevron-right | `src/pages/LearningHubPage.tsx` |
| Clock3 | https://lucide.dev/icons/clock-3 | `src/pages/CurriculumPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/PortalHomePage.tsx` |
| Compass | https://lucide.dev/icons/compass | `src/pages/AboutPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/PortalHomePage.tsx` |
| Copy | https://lucide.dev/icons/copy | `src/components/StudioExperiments.tsx` |
| ExternalLink | https://lucide.dev/icons/external-link | `src/pages/LearningHubPage.tsx`, `src/pages/SourcesPage.tsx` |
| Eye | https://lucide.dev/icons/eye | `src/pages/FieldGuidePage.tsx` |
| Fingerprint | https://lucide.dev/icons/fingerprint | `src/pages/AboutPage.tsx`, `src/pages/FieldGuidePage.tsx`, `src/pages/SourcesPage.tsx` |
| FlaskConical | https://lucide.dev/icons/flask-conical | `src/pages/PlaygroundPage.tsx` |
| GraduationCap | https://lucide.dev/icons/graduation-cap | `src/pages/SignupPage.tsx` |
| HeartHandshake | https://lucide.dev/icons/heart-handshake | `src/pages/AboutPage.tsx` |
| Layers3 | https://lucide.dev/icons/layers | `src/pages/LearningHubPage.tsx` |
| LayoutDashboard | https://lucide.dev/icons/layout-dashboard | `src/components/PortalShell.tsx` |
| Lightbulb | https://lucide.dev/icons/lightbulb | `src/components/DailyChallenge.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/PlaygroundPage.tsx` |
| Menu | https://lucide.dev/icons/menu | `src/components/PortalShell.tsx`, `src/components/PublicSiteChrome.tsx` |
| MessageSquareText | https://lucide.dev/icons/message-square-text | `src/components/AskSignal.tsx`, `src/components/EverydayAI.tsx`, `src/pages/CurriculumPage.tsx`, `src/pages/FieldGuidePage.tsx` |
| Pause | https://lucide.dev/icons/pause | `src/components/PublicSiteChrome.tsx` |
| Pencil | https://lucide.dev/icons/pencil | `src/pages/PortalHomePage.tsx` |
| Play | https://lucide.dev/icons/play | `src/components/PublicSiteChrome.tsx` |
| RotateCcw | https://lucide.dev/icons/rotate-ccw | `src/components/AskSignal.tsx`, `src/components/StudioExperiments.tsx`, `src/pages/LearningHubPage.tsx` |
| Search | https://lucide.dev/icons/search | `src/pages/ResourcesPage.tsx` |
| ShieldAlert | https://lucide.dev/icons/shield-alert | `src/pages/FieldGuidePage.tsx` |
| ShieldCheck | https://lucide.dev/icons/shield-check | `src/pages/CheckoutPage.tsx`, `src/pages/ContactPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/PortalHomePage.tsx`, `src/pages/SignupPage.tsx` |
| Sparkles | https://lucide.dev/icons/sparkles | `src/components/AskSignal.tsx`, `src/components/StudioExperiments.tsx`, `src/pages/AboutPage.tsx`, `src/pages/CurriculumPage.tsx`, `src/pages/LandingPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/PortalHomePage.tsx` |
| Target | https://lucide.dev/icons/target | `src/pages/LearningHubPage.tsx` |
| Trophy | https://lucide.dev/icons/trophy | `src/pages/LandingPage.tsx`, `src/pages/LearningHubPage.tsx`, `src/pages/PortalHomePage.tsx` |
| Users | https://lucide.dev/icons/users | `src/pages/AboutPage.tsx` |
| Wand2 | https://lucide.dev/icons/wand-sparkles | `src/pages/LandingPage.tsx`, `src/pages/PortalHomePage.tsx` |
| Bug | https://lucide.dev/icons/bug | `src/pages/ContactPage.tsx` |
| ChevronDown | https://lucide.dev/icons/chevron-down | `src/pages/CurriculumPage.tsx` |
| CreditCard | https://lucide.dev/icons/credit-card | `src/pages/CheckoutPage.tsx` |
| Flame | https://lucide.dev/icons/flame | `src/pages/PortalHomePage.tsx` |
| Headphones | https://lucide.dev/icons/headphones | `src/components/EverydayAI.tsx` |
| Info | https://lucide.dev/icons/info | `src/pages/OrderConfirmedPage.tsx`, `src/pages/ReadingListPage.tsx` |
| Loader | https://lucide.dev/icons/loader | `src/pages/CheckoutPage.tsx` |
| Lock | https://lucide.dev/icons/lock | `src/pages/CheckoutPage.tsx` |
| MessageCircle | https://lucide.dev/icons/message-circle | `src/components/TestimonialsSection.tsx`, `src/pages/ContactPage.tsx` |
| Minus | https://lucide.dev/icons/minus | `src/components/CartDrawer.tsx` |
| Moon | https://lucide.dev/icons/moon | `src/components/PublicSiteChrome.tsx` |
| Plus | https://lucide.dev/icons/plus | `src/components/CartDrawer.tsx`, `src/components/EverydayAI.tsx`, `src/pages/ReadingListPage.tsx` |
| Printer | https://lucide.dev/icons/printer | `src/components/Certificate.tsx` |
| Quote | https://lucide.dev/icons/quote | `src/components/TestimonialsSection.tsx` |
| RefreshCw | https://lucide.dev/icons/refresh-cw | `src/components/DailyChallenge.tsx` |
| ScanFace | https://lucide.dev/icons/scan-face | `src/components/EverydayAI.tsx` |
| Send | https://lucide.dev/icons/send | `src/components/AskSignal.tsx` |
| ShoppingBag | https://lucide.dev/icons/shopping-bag | `src/components/CartDrawer.tsx`, `src/components/PublicSiteChrome.tsx`, `src/pages/ReadingListPage.tsx` |
| Sun | https://lucide.dev/icons/sun | `src/components/PublicSiteChrome.tsx` |
| Tag | https://lucide.dev/icons/tag | `src/components/CartDrawer.tsx` |
| Trash2 | https://lucide.dev/icons/trash-2 | `src/components/CartDrawer.tsx` |
| X | https://lucide.dev/icons/x | `src/components/AskSignal.tsx`, `src/components/CartDrawer.tsx`, `src/components/Certificate.tsx`, `src/components/PublicSiteChrome.tsx` |

Note: a few names in the code are from Lucide 0.344's naming era and have since been
renamed upstream (`CheckCircle2` → `circle-check-big`, `Layers3` → `layers`,
`Wand2` → `wand-sparkles`). The linked pages are the current ones for the same icon.

**Citation for a printed works-cited page (MLA style):**

> Lucide Contributors, and Cole Bemis. *Lucide*, version 0.344.0, 2022–2026. Icon
> library. ISC License. https://lucide.dev. Accessed 1 Oct. 2026.

---

## 3. Typefaces

| Typeface | Designer | License | Source | Used for |
| --- | --- | --- | --- | --- |
| DM Sans | Colophon Foundry (Anton Koovit, Vika Usmanova), commissioned by Google | SIL Open Font License 1.1 | https://fonts.google.com/specimen/DM+Sans | Body text |
| Space Grotesk | Florian Karsten, based on Space Mono by Colophon Foundry | SIL Open Font License 1.1 | https://fonts.google.com/specimen/Space+Grotesk | Headings |

Both load from Google Fonts in `src/styles/landing.css` line 1. The SIL OFL permits
free use on websites with no on-page attribution required. The fallbacks
(`Trebuchet MS`, `Segoe UI`, `system-ui`) ship with the visitor's operating system
and are not redistributed by this site.

---

## 4. Original work created by this team

Not third-party assets. Listed so a judge can tell them apart from sourced material.

| Asset | What it is | Where |
| --- | --- | --- |
| Neural-network stage diagram | SVG drawn by our own code from coordinate arrays — lines and circles placed by a loop | `src/components/StudioExperiments.tsx` lines 13–16 |
| Fruit classifier scatter plot | SVG axes, gridlines, data points, and marker drawn by our own code from the `fruitData` array | `src/components/StudioExperiments.tsx` lines 43–50 |
| Progress ring | Two SVG circles using `strokeDasharray` to show percent complete | `src/pages/PortalHomePage.tsx` |
| Animated background field | Motion component written by our team | `src/components/NeuralField.tsx` |
| Book covers on the Reading List | Typography laid out in CSS from the title and author. No publisher cover art is reproduced. | `src/components/BookCover.tsx` |
| Certificate of completion | Laid out in CSS and printed by the browser | `src/components/Certificate.tsx` |
| All colors, layout, and type scale | Original design decisions | `src/styles/*.css` |
| All written copy, lesson content, and quiz questions | Written by our team | `src/data/*.ts`, `src/pages/*.tsx` |

The only raster images in the project are the eight photographs in section 1. Every
other graphic is a Lucide icon or vector shapes drawn by our own code.

### Books named on the Reading List

`/reading-list` names eight published books so visitors can find them at a library.
Titles, authors, publishers, years, and ISBNs are factual references; no cover art and
no text from inside the books is reproduced. The data lives in `src/data/books.ts`.
We are not affiliated with these authors or publishers. The shop takes no payment —
see section 5 of this file and `src/lib/checkout.ts`.

| Author | Title | Publisher | Year | ISBN |
| --- | --- | --- | --- | --- |
| Janelle Shane | You Look Like a Thing and I Love You | Voracious | 2019 | 9780316525220 |
| Melanie Mitchell | Artificial Intelligence: A Guide for Thinking Humans | Farrar, Straus and Giroux | 2019 | 9780374257835 |
| Hannah Fry | Hello World: Being Human in the Age of Algorithms | W. W. Norton & Company | 2018 | 9780393634990 |
| Ethan Mollick | Co-Intelligence: Living and Working with AI | Portfolio / Penguin | 2024 | 9780593716717 |
| Brian Christian | The Alignment Problem: Machine Learning and Human Values | W. W. Norton & Company | 2020 | 9780393635829 |
| Cathy O'Neil | Weapons of Math Destruction | Crown | 2016 | 9780553418811 |
| Ruha Benjamin | Race After Technology | Polity | 2019 | 9781509526406 |
| Kate Crawford | Atlas of AI | Yale University Press | 2021 | 9780300264630 |

---

## 5. Software and frameworks

Tools the site was built with, not content shown on it. Included for completeness.

| Tool | Version | License | Source |
| --- | --- | --- | --- |
| React | 18.3.1 | MIT | https://react.dev |
| React Router | 7.8.2 | MIT | https://reactrouter.com |
| Vite | 5.4.2 | MIT | https://vite.dev |
| Tailwind CSS | 3.4.1 | MIT | https://tailwindcss.com |
| TypeScript | 5.5.3 | Apache-2.0 | https://www.typescriptlang.org |

---

## 6. How to verify this list

```bash
# Every icon import in the project
grep -rn "from 'lucide-react'" src

# Every image file in the project. Should be exactly the eight photos
# listed in section 1, and nothing else.
find public src -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \
  -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.svg" -o -iname "*.ico" \)

# The Lucide license, exactly as shipped with the package
cat licenses/lucide-ISC-LICENSE.txt
```

To confirm every photo on disk is credited and every credit points at a real file:

```bash
ls public/photos | sed 's/\.jpg$//' | sort > /tmp/on-disk.txt
grep -oE "^    id: '[a-z-]+'" src/data/photos.ts \
  | sed "s/.*id: '//; s/'//" | sort > /tmp/credited.txt
echo "--- on disk but not credited ---"; comm -23 /tmp/on-disk.txt /tmp/credited.txt
echo "--- credited but missing ---";     comm -13 /tmp/on-disk.txt /tmp/credited.txt
```

To confirm the on-site credits page still lists every icon the app imports, compare
the two lists — this should print nothing under either heading:

```bash
grep -rhno "import {[^}]*} from 'lucide-react'" src --include=*.tsx \
  | sed "s/.*import {//; s/} from.*//" | tr ',' '\n' \
  | sed 's/^ *//; s/ *$//' | grep -v '^$' | sort -u > /tmp/used.txt
grep -oE "^  \{ name: '[A-Za-z0-9]+', slug:" src/data/sources.ts \
  | sed "s/.*name: '//; s/', slug://" | sort -u > /tmp/cited.txt
echo "--- used but not cited ---"; comm -23 /tmp/used.txt /tmp/cited.txt
echo "--- cited but not used ---"; comm -13 /tmp/used.txt /tmp/cited.txt
```
