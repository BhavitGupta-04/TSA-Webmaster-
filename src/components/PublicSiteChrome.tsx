import { Activity, ArrowUpRight, Menu, Moon, Pause, Play, ShoppingBag, Sun, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSiteMotion } from '../state/useSiteMotion';
import { useTheme } from '../state/useTheme';
import { useCart } from '../state/useCart';
import ScrollProgressRing from './ScrollProgressRing';

export function PublicSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { paused, systemReduced, toggle } = useSiteMotion();
  const { theme, toggle: toggleTheme } = useTheme();
  const { totals, openCart } = useCart();
  const { pathname } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  return <><header className="landing-header studio-header"><a className="studio-skip" href="#main-content">Skip to content</a><div className="landing-width landing-header-inner">
    <Link className="landing-brand" to="/" aria-label="Signal Lab home"><span className="landing-brand-mark"><Activity size={21} /></span><span>signal<span className="landing-brand-period">.</span></span></Link>
    <nav id="public-navigation" className={`landing-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink><NavLink to="/curriculum" onClick={() => setMenuOpen(false)}>Curriculum</NavLink><NavLink to="/playground" onClick={() => setMenuOpen(false)}>Playground</NavLink><NavLink to="/reading-list" onClick={() => setMenuOpen(false)}>Reading List</NavLink><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
    </nav>
    <div className="landing-header-actions">
      <button className="studio-motion-toggle studio-theme-toggle" type="button" aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={toggleTheme}>{theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</button>
      <button className="studio-motion-toggle studio-animation-toggle" type="button" aria-pressed={paused} aria-label={systemReduced ? 'Reduced motion is enabled by your device' : paused ? 'Resume animations' : 'Pause animations'} disabled={systemReduced} onClick={toggle}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
      <button className="studio-cart-button" type="button" onClick={openCart} aria-label={`Open cart, ${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'}`}><ShoppingBag size={16} />{totals.itemCount > 0 && <span className="studio-cart-count">{totals.itemCount}</span>}</button>
      <Link className="landing-signup-small" to="/portal">My learning <ArrowUpRight size={15} /></Link>
      <button ref={menuButton} type="button" className="landing-menu-toggle" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="public-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
    </div>
  </div></header><ScrollProgressRing /></>;
}
export function PublicSiteFooter() {
  return <footer className="studio-footer"><div className="landing-width"><div className="studio-footer-grid"><div><Link className="landing-brand" to="/" aria-label="Signal Lab home"><span className="landing-brand-mark"><Activity size={21} /></span><span>signal<span className="landing-brand-period">.</span></span></Link><p>A little curiosity.<br />A whole new way to see AI.</p><span>Made for curious minds in grades 9–12.</span></div><nav aria-label="Learn links"><h2>FIND YOUR CURIOSITY</h2><Link to="/curriculum">Our curriculum</Link><Link to="/learn?module=fundamentals">AI Fundamentals</Link><Link to="/learn?module=tools">Practical AI Tools</Link><Link to="/learn?module=ethics">Ethical AI Use</Link><Link to="/learn?module=creativity">Creative AI</Link></nav><nav aria-label="Explore links"><h2>KEEP EXPLORING</h2><Link to="/playground">Playground</Link><Link to="/field-guide">Student field guide</Link><Link to="/resources">Resource library</Link><Link to="/reading-list">Reading list</Link><Link to="/progress">Your progress</Link></nav><nav aria-label="About links"><h2>BEHIND SIGNAL</h2><Link to="/about">Our story</Link><Link to="/about#principles">What we believe</Link><Link to="/about#privacy">Your data & privacy</Link><Link to="/contact">Contact the project</Link><Link to="/sources">Sources & credits</Link><Link to="/signup">Create a local profile</Link></nav></div><div className="studio-footer-bottom"><span>Signal Lab / An AI learning portal</span><span>Stay curious. Keep the thinking yours.</span><Link className="studio-footer-credit" to="/sources">Photos via Pexels · Icons by Lucide (ISC) · Sources &amp; credits</Link><a href="#main-content">Back to the top ↑</a></div></div></footer>;
}
