import { Link, NavLink } from 'react-router-dom';
import { Award, BookOpen, BrainCircuit, ArrowUpRight, LayoutDashboard, Menu, X, Sparkles, Play } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useProgress } from '../state/progress-context';
import '../styles/portal.css';

const navigation = [
  { label: 'My space', href: '/portal', icon: LayoutDashboard },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'References', href: '/learn/references', icon: Play },
  { label: 'My progress', href: '/progress', icon: Award },
];
export default function PortalShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { displayName, xp } = useProgress();
  return <div className="portal-app academy">
    <a className="academy-skip" href="#main-content">Skip to learning content</a>
    <header className="academy-topbar"><div className="academy-topbar-inner"><Link to="/portal" className="academy-brand" aria-label="Signal Lab learning home"><span><BrainCircuit size={24} /></span><div><strong>signal<span>.</span></strong><small>THE LEARNING LAB</small></div></Link><nav id="portal-navigation" className={menuOpen ? 'is-open' : ''} aria-label="Learning portal navigation" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); document.getElementById('portal-menu')?.focus(); } }}>{navigation.map(({ label, href, icon: Icon }) => <NavLink key={href} to={href} end={href === '/learn'} onClick={() => setMenuOpen(false)}><Icon size={16} />{label}</NavLink>)}<Link className="academy-mobile-home" to="/">Main website <ArrowUpRight size={14} /></Link></nav><div className="academy-account"><span><Sparkles size={15} />{xp} XP</span><span className="academy-avatar" title={displayName} aria-label={displayName}>{displayName.slice(0, 1).toUpperCase()}</span><Link to="/" className="academy-home-link">Main website <ArrowUpRight size={14} /></Link><button id="portal-menu" className="academy-menu" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="portal-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div></div></header>
    <main id="main-content" tabIndex={-1}>{children}</main>
  </div>;
}
