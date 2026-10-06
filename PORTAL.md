# Learning portal

The student dashboard lives at /portal, lessons at /learn?lesson=<id>, dedicated quizzes at /learn/<id>/quiz, and progress at /progress.
Public pages and src/data/learningModules.ts remain unchanged.

- src/data/portalCurriculum.ts: eight lessons in four units, 35 minutes per lesson as an estimate.
- Suggested lesson pacing: Learn (about 20 minutes, choosing video or reading and working through three school situations), Practice (8 minutes, including a worked example and lab), Apply (7 minutes). A separate quiz takes about 5 additional minutes. These are estimates, not enforced timers.
- Activities include classification, a threshold simulator, prompt construction, evidence sorting, fairness calculations, and sequencing.
- src/lib/portalWorkbook.ts: saved drafts, prerequisite checks, project self-review, and text export.
- src/styles/academy.css: dashboard and shared portal styling, always light.
- src/styles/lesson-focus.css: focused lesson and quiz layouts; the dashboard is unchanged.
- src/data/lessonGuides.ts: worked examples, reasoning steps, misconceptions, and transfer tasks.
- src/components/LessonVideo.tsx: native video playback, English captions, seekable chapters, and full transcripts.

Completion requires correct reading checkpoints, a written and self-reviewed worked-example response, a completed lab, recorded project responses with self-review, and at least 80% on the quiz. Projects are self-assessed, not AI- or teacher-graded. Timing is guidance, never a forced wait. Each new lesson awards 100 XP once.

Workbooks use portal-workbook-v2:<lesson-id> entries inside the existing profile's notes store. Existing XP, badges, notes, and flashcards are preserved. No database migration, external AI service, or account is required. Storage is local to the browser; workbook downloads provide a portable text copy.

The dashboard supports topic/vocabulary search, level filters, a recent-lesson resume link, lesson progress, unit badges, a project shelf, and a certificate based on all eight lessons.

## Verification

Run from frontend:

~~~text
npm run build
npm run lint
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
npm run check:credits
node scripts/portal-smoke.mjs
~~~

The smoke test uses Node 24+, a built production site, and Microsoft Edge on Windows. Set EDGE_PATH to override the Edge executable. Ports 4183 and 9225 must be free. It uses a temporary browser profile and does not touch a learner's normal browser data.

It covers every lesson, real video playback and seeking, finite durations, caption loading, the video reference library, failed and successful attempts, dedicated quiz routing, completion gates, one-time XP, saved drafts, legacy progress, and mobile layouts. Screenshots are written to a temporary directory. Use --certificate-only for a focused check of certificate totals.

## Original lesson videos

Eight original illustrated video lessons (about 5-7 minutes each) are stored in public/lesson-videos, with PNG posters, English WebVTT captions, and twelve seekable chapters each. src/data/lessonVideos.json contains actual chapter times and full transcripts. Each video uses a distinct, scenario-based script to complement rather than repeat the on-page explanation. Narration uses Microsoft's natural-sounding Ava neural voice; it is AI-generated, not human-recorded. Caption sentence timings are estimated within each chapter.

The videos use original chapter cards with changing highlights. They are narrated slide lessons, not generative video footage. Reading is an alternative to watching, and no external video is required to finish a lesson.

Regenerate on Windows with Python and an internet connection:

~~~text
python -m pip install --target .video-tools edge-tts Pillow imageio-ffmpeg
python scripts/expand-video-scripts.py
python scripts/render-full-lessons.py
~~~

The optional rendering dependencies are ignored by Git and are not required to run the website. One-time voice generation sends only the public lesson narration to Microsoft's Edge text-to-speech service; it does not send learner information. Generated audio, captions, and illustrations are stored with the site, so playback does not call the speech service. Intermediate audio and images go to a temporary directory. The old Node entry point delegates to this renderer.

## Expanded reading and references

src/data/lessonExtensions.json adds three original school-based situations per lesson, each with a reflection prompt and a comparison explanation. Responses save in the existing workbook practice map and are included in workbook downloads. Reflection is not automatically graded.

The ethics unit is now called Responsible AI. Its stable ID and lesson IDs are unchanged, preserving existing progress. Its cases cover participation, fairness, privacy, honest disclosure, meaningful human review, and appeals.

The Video references page is available inside My Learning and links to three optional videos. Optional lesson players connect to YouTube's privacy-enhanced embed domain only after the learner clicks Load reference video. External links remain available if embedding is blocked. Creators are credited without implying endorsement:
- Code.org / CodeAI, What is Machine Learning?: https://www.youtube.com/watch?v=KHbwOetbmbs
- Common Sense Education, Using AI Wisely for School Success: https://www.commonsensemedia.org/using-ai-wisely-for-school-success (linked video: https://www.youtube.com/watch?v=9x7srNK_i1Q)
- Google Cloud, Introduction to Responsible AI (2024): https://www.youtube.com/watch?v=w_3L1Bf2P_g

The lesson organization takes inspiration from IXL's explanation, example, and immediate-feedback pattern, not its branding or content:
https://blog.ixl.com/2021/10/21/ixls-instructional-resources-tools-to-empower-independent-learning/

## Saved quiz attempts

Each attempt records checked question indices and locks answers after feedback. Refreshing resumes the next unchecked question. Results can be retried without duplicate XP. Workbook exports include the guided-practice response, project, self-review, notes, and lab answers.
