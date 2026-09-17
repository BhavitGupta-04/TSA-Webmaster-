import { ArrowRight, Award, BookOpen, CheckCircle2, LockKeyhole, RefreshCw, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../state/useProgress';

const foundations = [
  { id: 'fundamentals', title: 'AI Fundamentals', description: 'Build a clear mental model of how AI systems learn, predict, and generate.', xp: 100 },
  { id: 'tools', title: 'Practical AI Tools', description: 'Practice prompting, checking sources, and turning AI into a thoughtful study partner.', xp: 100 },
  { id: 'ethics', title: 'Ethical AI Use', description: 'Learn how to use AI honestly, safely, and with your own judgment in the loop.', xp: 100 },
];

export default function PortalHomePage() {
  const { displayName, completedModules, xp } = useProgress();
  const completion = Math.round((completedModules.length / foundations.length) * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div><h1 className="text-2xl font-bold text-gray-900">AI Learning Dashboard</h1><p className="mt-1 text-sm text-gray-600">Welcome back, {displayName}. Build practical AI confidence.</p></div>
          <div className="hidden items-center gap-3 sm:flex"><button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><RefreshCw size={16} /> Refresh</button><button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><User size={16} /> Profile</button></div>
        </div>
      </header>
      <main className="p-6">
        <div className="mx-auto max-w-7xl">
          <section className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Your learning path</p><h2 className="mt-2 text-3xl font-bold text-gray-900">Understand AI. Use it well.</h2><p className="mt-2 max-w-2xl text-gray-600">Explore the foundations, practice useful techniques, and learn how to make responsible decisions with AI.</p><Link to="/learn" className="mt-5 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Start learning <ArrowRight size={16} /></Link></div><div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-8 border-blue-100 text-center"><span className="text-2xl font-bold text-blue-700">{completion}%</span><span className="text-xs text-gray-500">complete</span></div></div>
          </section>
          <div className="mb-6 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Current XP</p><p className="mt-2 text-3xl font-bold text-gray-900">{xp}</p></div><div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Modules completed</p><p className="mt-2 text-3xl font-bold text-gray-900">{completedModules.length} <span className="text-base font-normal text-gray-500">of {foundations.length}</span></p></div><div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">Badges earned</p><p className="mt-2 flex items-center gap-2 text-3xl font-bold text-gray-900"><Award className="text-amber-500" size={25} /> {completedModules.length}</p></div></div>
          <h2 className="mb-4 text-xl font-bold text-gray-900">Learning modules</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {foundations.map((module, index) => {
            const complete = completedModules.includes(module.id);
            return <Link to="/learn" key={module.id} className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">Module 0{index + 1}</span>{complete ? <CheckCircle2 className="text-green-500" size={19} /> : <LockKeyhole className="text-gray-400" size={18} />}</div>
              <BookOpen className="mt-8 text-blue-600" size={24} />
              <h3 className="mt-4 text-xl font-bold text-gray-900">{module.title}</h3>
              <p className="mt-2 min-h-14 text-sm leading-6 text-gray-600">{module.description}</p>
              <p className="mt-5 text-sm font-semibold text-blue-600">{complete ? 'Completed' : `Earn ${module.xp} XP`}</p>
            </Link>;
          })}
        </div>
        </div>
      </main>
      </div>
  );
}