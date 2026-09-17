import { NavLink } from 'react-router-dom';
import { Award, BookOpen, BrainCircuit, LayoutDashboard, Menu, Sparkles, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useProgress } from '../state/useProgress';

interface PortalShellProps {
  children: ReactNode;
}

const navigation = [
  { label: 'Home', href: '/', icon: LayoutDashboard },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Progress', href: '/progress', icon: Award },
];

export default function PortalShell({ children }: PortalShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { displayName, xp } = useProgress();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-600 p-2 text-white"><BrainCircuit size={20} /></div>
            <div><p className="font-semibold tracking-tight text-gray-900">Signal Lab</p><p className="text-xs text-gray-500">AI learning portal</p></div>
          </div>
          <button className="text-gray-500 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X size={20} /></button>
        </div>

        <nav className="mt-6 space-y-1" aria-label="Main navigation">
          {navigation.map(({ label, href, icon: Icon }) => (
            <NavLink key={href} to={href} onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? 'border-blue-500 bg-blue-50 font-semibold text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'} flex items-center gap-3 border-l-4 px-3 py-3 text-sm transition-colors`}>
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 border-t border-gray-200 p-4">
          <div className="flex items-center justify-between text-xs text-gray-500"><span>{displayName}</span><Sparkles size={15} className="text-blue-500" /></div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{xp} XP</p>
          <p className="mt-1 text-xs text-gray-500">Learning progress</p>
        </div>
      </aside>

      {menuOpen && <button className="fixed inset-0 z-30 bg-gray-600/75 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close navigation overlay" />}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm lg:hidden">
          <button className="text-gray-600" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu size={22} /></button>
          <span className="text-sm font-semibold text-gray-900">Signal Lab</span>
          <span className="text-xs font-medium text-blue-700">{xp} XP</span>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}