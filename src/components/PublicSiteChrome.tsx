import { Activity, ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSiteMotion } from '../state/useSiteMotion';

export function PublicSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { paused, systemReduced, toggle } = useSiteMotion();
  const { pathname } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  return <header className="landing-header studio-header"><a className="studio-skip" href="#main-content">Skip to content</a><div className="landing-width landing-header-inner">
    <Link className="landing-brand" to="/" aria-label="Signal Lab home"><span className="landing-brand-mark"><Activity size={21} /></span><span>signal<span className="landing-brand-period">.</span></span></Link>
    <nav id="public-navigation" className={`landing-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <Link to="/#curriculum" onClick={() => setMenuOpen(false)}>Explore AI</Link><NavLink to="/playground">Playground</NavLink><NavLink to="/about">Our story</NavLink><NavLink to="/resources">Resources</NavLink>
    </nav>
    <div className="landing-header-actions"><button className="studio-motion-toggle" type="button" aria-pressed={paused} aria-label={systemReduced ? 'Reduced motion is enabled by your device' : paused ? 'Resume animations' : 'Pause animations'} disabled={systemReduced} onClick={toggle}>{paused ? <Play size={15} /> : <Pause size={15} />}</button><Link className="landing-signup-small" to="/portal">My learning <ArrowUpRight size={15} /></Link><button ref={menuButton} type="button" className="landing-menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
  </div></header>;
}
export function PublicSiteFooter() {
  return <footer className="studio-footer"><div className="landing-width"><div className="studio-footer-grid"><div><Link className="landing-brand" to="/" aria-label="Signal Lab home"><span className="landing-brand-mark"><Activity size={21} /></span><span>signal<span className="landing-brand-period">.</span></span></Link><p>A little curiosity.<br />A whole new way to see AI.</p><span>Made for curious minds in grades 9–12.</span></div><nav aria-label="Learn links"><h2>FIND YOUR CURIOSITY</h2><Link to="/learn?module=fundamentals">AI Fundamentals</Link><Link to="/learn?module=tools">Practical AI Tools</Link><Link to="/learn?module=ethics">Ethical AI Use</Link><Link to="/learn?module=creativity">Creative AI</Link></nav><nav aria-label="Explore links"><h2>KEEP EXPLORING</h2><Link to="/playground">Playground</Link><Link to="/field-guide">Student field guide</Link><Link to="/resources">Resource library</Link><Link to="/progress">Your progress</Link></nav><nav aria-label="About links"><h2>BEHIND SIGNAL</h2><Link to="/about">Our story</Link><Link to="/about#principles">What we believe</Link><Link to="/about#privacy">Your data & privacy</Link><Link to="/sources">Sources & credits</Link><Link to="/signup">Create a local profile</Link></nav></div><div className="studio-footer-bottom"><span>Signal Lab / An AI learning portal</span><span>Stay curious. Keep the thinking yours.</span><Link className="studio-footer-credit" to="/sources">Icons by Lucide (ISC) · Sources &amp; credits</Link><a href="#main-content">Back to the top ↑</a></div></div></footer>;
}
