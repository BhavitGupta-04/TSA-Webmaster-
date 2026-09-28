import { Link, NavLink } from 'react-router-dom';
import { Award, BookOpen, BrainCircuit, ArrowUpRight, LayoutDashboard, Menu } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useProgress } from '../state/useProgress';

interface PortalShellProps {
  children: ReactNode;
}

const navigation = [
  { label: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Progress', href: '/progress', icon: Award },
];

export default function PortalShell({ children }: PortalShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { displayName, xp } = useProgress();

  return (
    <div className="portal-app min-h-screen text-gray-900">
      <header className="portal-topbar sticky top-0 z-40 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="portal-logo" aria-label="Signal Lab homepage"><BrainCircuit size={22} /></Link>
            <div><p className="text-lg font-bold tracking-tight">Signal Lab</p><p className="text-[10px] uppercase tracking-[0.2em] text-cyan-100">AI learning portal</p></div>
          </div>
          <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">
            <Link to="/playground" className="flex items-center gap-2 text-sm text-cyan-100 hover:text-white">Try something in the Playground <ArrowUpRight size={16} /></Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-sm font-medium sm:inline">{xp} XP</span>
            <span className="hidden rounded-md bg-white/15 px-3 py-2 text-sm sm:inline">{displayName}</span>
            <button className="rounded-md bg-white/15 p-2 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="portal-navigation"><Menu size={20} /></button>
          </div>
        </div>
        <nav id="portal-navigation" className={`${menuOpen ? 'flex' : 'hidden'} mx-auto max-w-7xl flex-col gap-1 border-t border-white/15 px-5 py-3 md:flex md:flex-row md:items-center md:justify-center md:gap-10 md:border-0 md:py-2`} aria-label="Main navigation">
          {navigation.map(({ label, href, icon: Icon }) => (
            <NavLink key={href} to={href} onClick={() => setMenuOpen(false)} className={({ isActive }) => `${isActive ? 'bg-[#ff735f] text-white' : 'text-slate-200 hover:bg-white/10'} flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors`}>
              <Icon size={16} />{label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main-content" tabIndex={-1} className="portal-main">{children}</main>
    </div>
  );
}
