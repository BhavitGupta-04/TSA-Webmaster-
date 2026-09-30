import { Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, BadgeCheck, BookOpen, BookOpenCheck, BrainCircuit, Check, CheckCircle2, ChevronRight, Clock3, Compass, Copy, ExternalLink, Eye, Fingerprint, FlaskConical, GraduationCap, HeartHandshake, Layers3, LayoutDashboard, Lightbulb, Menu, MessageSquareText, Pause, Pencil, Play, Radio, RotateCcw, Search, ShieldAlert, ShieldCheck, Sparkles, Target, Trophy, Users, Wand2, X, type LucideIcon } from 'lucide-react';

export const iconLibrary = {
  name: 'Lucide',
  packageName: 'lucide-react',
  version: '0.344.0',
  creators: 'Lucide Contributors (2022–present); portions by Cole Bemis, 2013–2022, as part of Feather',
  license: 'ISC License',
  licenseUrl: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE',
  site: 'https://lucide.dev',
  repository: 'https://github.com/lucide-icons/lucide',
  citation: 'Lucide Contributors, and Cole Bemis. Lucide, version 0.344.0, 2022–2026. Icon library. ISC License. https://lucide.dev.',
};

// Every icon on this site, with the slug of its page on lucide.dev. A few names in
// our code are from Lucide 0.344 and were renamed upstream later, so the slug and
// the component name differ for those three.
export const iconCredits: { name: string; slug: string; icon: LucideIcon }[] = [
  { name: 'Activity', slug: 'activity', icon: Activity },
  { name: 'ArrowDown', slug: 'arrow-down', icon: ArrowDown },
  { name: 'ArrowLeft', slug: 'arrow-left', icon: ArrowLeft },
  { name: 'ArrowRight', slug: 'arrow-right', icon: ArrowRight },
  { name: 'ArrowUpRight', slug: 'arrow-up-right', icon: ArrowUpRight },
  { name: 'Award', slug: 'award', icon: Award },
  { name: 'BadgeCheck', slug: 'badge-check', icon: BadgeCheck },
  { name: 'BookOpen', slug: 'book-open', icon: BookOpen },
  { name: 'BookOpenCheck', slug: 'book-open-check', icon: BookOpenCheck },
  { name: 'BrainCircuit', slug: 'brain-circuit', icon: BrainCircuit },
  { name: 'Check', slug: 'check', icon: Check },
  { name: 'CheckCircle2', slug: 'circle-check-big', icon: CheckCircle2 },
  { name: 'ChevronRight', slug: 'chevron-right', icon: ChevronRight },
  { name: 'Clock3', slug: 'clock-3', icon: Clock3 },
  { name: 'Compass', slug: 'compass', icon: Compass },
  { name: 'Copy', slug: 'copy', icon: Copy },
  { name: 'ExternalLink', slug: 'external-link', icon: ExternalLink },
  { name: 'Eye', slug: 'eye', icon: Eye },
  { name: 'Fingerprint', slug: 'fingerprint', icon: Fingerprint },
  { name: 'FlaskConical', slug: 'flask-conical', icon: FlaskConical },
  { name: 'GraduationCap', slug: 'graduation-cap', icon: GraduationCap },
  { name: 'HeartHandshake', slug: 'heart-handshake', icon: HeartHandshake },
  { name: 'Layers3', slug: 'layers', icon: Layers3 },
  { name: 'LayoutDashboard', slug: 'layout-dashboard', icon: LayoutDashboard },
  { name: 'Lightbulb', slug: 'lightbulb', icon: Lightbulb },
  { name: 'Menu', slug: 'menu', icon: Menu },
  { name: 'MessageSquareText', slug: 'message-square-text', icon: MessageSquareText },
  { name: 'Pause', slug: 'pause', icon: Pause },
  { name: 'Pencil', slug: 'pencil', icon: Pencil },
  { name: 'Play', slug: 'play', icon: Play },
  { name: 'Radio', slug: 'radio', icon: Radio },
  { name: 'RotateCcw', slug: 'rotate-ccw', icon: RotateCcw },
  { name: 'Search', slug: 'search', icon: Search },
  { name: 'ShieldAlert', slug: 'shield-alert', icon: ShieldAlert },
  { name: 'ShieldCheck', slug: 'shield-check', icon: ShieldCheck },
  { name: 'Sparkles', slug: 'sparkles', icon: Sparkles },
  { name: 'Target', slug: 'target', icon: Target },
  { name: 'Trophy', slug: 'trophy', icon: Trophy },
  { name: 'Users', slug: 'users', icon: Users },
  { name: 'Wand2', slug: 'wand-sparkles', icon: Wand2 },
  { name: 'X', slug: 'x', icon: X },
];

export const fontCredits = [
  { name: 'DM Sans', designer: 'Colophon Foundry (Anton Koovit, Vika Usmanova), commissioned by Google', license: 'SIL Open Font License 1.1', url: 'https://fonts.google.com/specimen/DM+Sans', usedFor: 'Body text' },
  { name: 'Space Grotesk', designer: 'Florian Karsten, based on Space Mono by Colophon Foundry', license: 'SIL Open Font License 1.1', url: 'https://fonts.google.com/specimen/Space+Grotesk', usedFor: 'Headings and figures' },
];

export const originalWork = [
  { title: 'Neural-network stage diagram', detail: 'SVG drawn by our own code, placing lines and circles from coordinate arrays. Not a traced or generated image.' },
  { title: 'Fruit classifier scatter plot', detail: 'SVG axes, gridlines, data points, and marker drawn by our own code from an array of six invented examples.' },
  { title: 'Progress ring', detail: 'Two SVG circles using strokeDasharray to show the percent of the learning path completed.' },
  { title: 'Animated background field', detail: 'A motion component written by our team. No stock footage or generated video.' },
  { title: 'Colors, layout, and type scale', detail: 'Original design decisions. No purchased or generated template.' },
  { title: 'All written copy, lessons, and quiz questions', detail: 'Written by our team for this competition entry.' },
];

export const softwareCredits = [
  { name: 'React', version: '18.3.1', license: 'MIT', url: 'https://react.dev' },
  { name: 'React Router', version: '7.8.2', license: 'MIT', url: 'https://reactrouter.com' },
  { name: 'Vite', version: '5.4.2', license: 'MIT', url: 'https://vite.dev' },
  { name: 'Tailwind CSS', version: '3.4.1', license: 'MIT', url: 'https://tailwindcss.com' },
  { name: 'TypeScript', version: '5.5.3', license: 'Apache-2.0', url: 'https://www.typescriptlang.org' },
];
