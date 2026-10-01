import { ArrowUpRight, BadgeCheck, ExternalLink, Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import Reveal from '../components/Reveal';
import { fontCredits, iconCredits, iconLibrary, originalWork, softwareCredits } from '../data/sources';
import { photoLibrary, sitePhotos } from '../data/photos';
import { bookCatalog } from '../data/books';

export default function SourcesPage() {
  return <div className="signal-landing studio-interior"><PublicSiteHeader /><main id="main-content" tabIndex={-1}>
    <section className="studio-page-hero"><div className="landing-width"><p className="studio-eyebrow"><BadgeCheck size={17} /> SOURCES &amp; CREDITS</p><h1>Every borrowed piece,<br /><em>named out loud.</em></h1><p>We ask you to check your sources, so here are ours. Everything on this site that we did not make ourselves is listed below with its creator, its license, and a link you can follow.</p><nav className="studio-anchor-pills" aria-label="Sections on this page"><a href="#photos">01 / Photographs</a><a href="#icons">02 / Icons</a><a href="#fonts">03 / Typefaces</a><a href="#books">04 / Books</a><a href="#original">05 / Our own work</a><a href="#software">06 / Software</a></nav></div></section>

    <section className="landing-width studio-sources-section" id="photos" tabIndex={-1}>
      <Reveal>
        <p className="studio-eyebrow">01 / PHOTOGRAPHS</p>
        <h2>All {sitePhotos.length} photographs come from<br /><em>one free stock library.</em></h2>
        <p className="studio-sources-lede">Each photographer's name sits in the corner of their photo wherever it appears, so the credit travels with the image. The full list is here.</p>
        <dl className="studio-credit-facts">
          <div><dt>Library</dt><dd>{photoLibrary.source}</dd></div>
          <div><dt>License</dt><dd><a href={photoLibrary.licenseUrl} target="_blank" rel="noopener noreferrer">{photoLibrary.license}<ExternalLink size={13} /><span className="sr-only"> (opens in a new tab)</span></a> — {photoLibrary.licenseSummary}</dd></div>
          <div><dt>How we use them</dt><dd>Each file was downloaded once and is served from this site, cropped to fit its frame. The photos are illustrative: the people in them are not members of our team and are not connected to this project.</dd></div>
        </dl>
      </Reveal>
      <ul className="studio-photo-credit-grid">
        {sitePhotos.map(photo => <li key={photo.id}>
          <a href={photo.url} target="_blank" rel="noopener noreferrer">
            <img src={photo.file} alt="" loading="lazy" decoding="async" width={320} height={200} />
            <div>
              <span className="studio-eyebrow">{photo.usedOn}</span>
              <strong>{photo.title}</strong>
              <span>Photo by {photo.photographer} on Pexels<ArrowUpRight size={13} /><span className="sr-only"> (opens in a new tab)</span></span>
            </div>
          </a>
        </li>)}
      </ul>
      <blockquote className="studio-citation"><p className="studio-eyebrow">FOR A PRINTED WORKS-CITED PAGE</p><p>{sitePhotos.map(photo => `${photo.photographer}. "${photo.title}." Pexels, ${photo.url}.`).join(' ')}</p></blockquote>
    </section>

    <section className="landing-width studio-sources-section" id="icons" tabIndex={-1}>
      <Reveal>
        <p className="studio-eyebrow">02 / ICONS</p>
        <h2>All {iconCredits.length} icons come from<br /><em>one open-source library.</em></h2>
        <p className="studio-sources-lede">Every icon is drawn by the contributors to {iconLibrary.name} and used unmodified, recolored only through CSS.</p>
        <dl className="studio-credit-facts">
          <div><dt>Library</dt><dd>{iconLibrary.name} <span>({iconLibrary.packageName} {iconLibrary.version})</span></dd></div>
          <div><dt>Created by</dt><dd>{iconLibrary.creators}</dd></div>
          <div><dt>License</dt><dd><a href={iconLibrary.licenseUrl} target="_blank" rel="noopener noreferrer">{iconLibrary.license}<ExternalLink size={13} /><span className="sr-only"> (opens in a new tab)</span></a> — free to use and modify, provided the copyright notice is kept. A copy travels with our source code.</dd></div>
          <div><dt>Source</dt><dd><a href={iconLibrary.repository} target="_blank" rel="noopener noreferrer">{iconLibrary.repository.replace('https://', '')}<ExternalLink size={13} /><span className="sr-only"> (opens in a new tab)</span></a></dd></div>
        </dl>
      </Reveal>
      <p className="studio-sources-note">Each icon below is the real one, rendered from the library on this page. Select any of them to open its page on lucide.dev.</p>
      <ul className="studio-icon-credit-grid">
        {iconCredits.map(({ name, slug, icon: Icon }) => <li key={name}><a href={`${iconLibrary.site}/icons/${slug}`} target="_blank" rel="noopener noreferrer"><Icon size={24} aria-hidden="true" /><span>{name}</span><span className="sr-only"> on lucide.dev (opens in a new tab)</span></a></li>)}
      </ul>
      <p className="studio-sources-disclosure">Three names in our code date from Lucide 0.344 and were renamed upstream later: CheckCircle2 is now circle-check-big, Layers3 is now layers, and Wand2 is now wand-sparkles. The links point to the current page for the same icon.</p>
      <blockquote className="studio-citation"><p className="studio-eyebrow">FOR A PRINTED WORKS-CITED PAGE</p><p>{iconLibrary.citation}</p></blockquote>
    </section>

    <section className="studio-sources-band" id="fonts" tabIndex={-1}><div className="landing-width">
      <p className="studio-eyebrow">03 / TYPEFACES</p>
      <h2>Two typefaces,<br /><em>both freely licensed.</em></h2>
      <div className="studio-font-grid">{fontCredits.map(font => <article key={font.name}><span className="studio-font-sample" style={{ fontFamily: `'${font.name}', sans-serif` }} aria-hidden="true">Aa</span><h3>{font.name}</h3><dl><div><dt>Designed by</dt><dd>{font.designer}</dd></div><div><dt>License</dt><dd>{font.license}</dd></div><div><dt>Used for</dt><dd>{font.usedFor}</dd></div></dl><a href={font.url} target="_blank" rel="noopener noreferrer">View on Google Fonts <ArrowUpRight size={15} /><span className="sr-only"> (opens in a new tab)</span></a></article>)}</div>
      <p className="studio-sources-disclosure">Both load from Google Fonts. The Open Font License allows free use on a website with no attribution required on the page — we list them anyway. Our fallback fonts ship with your own operating system and are not redistributed by this site.</p>
    </div></section>

    <section className="landing-width studio-sources-section" id="books" tabIndex={-1}>
      <Reveal>
        <p className="studio-eyebrow">04 / BOOKS IN THE READING LIST</p>
        <h2>Real books,<br /><em>listed as references.</em></h2>
        <p className="studio-sources-lede">Our Reading List names {bookCatalog.length} published books so you can find them at a library or bookshop. Titles, authors, and publication years are facts about those books; we reproduce no cover artwork and no text from inside them. The covers you see on that page are typography we set ourselves. We are not affiliated with these authors or publishers, and nothing you do on this site sends money to anyone.</p>
      </Reveal>
      <ol className="studio-original-list">{bookCatalog.map((book, index) => <li key={book.id}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{book.title}</h3><p>{book.author}. <em>{book.title}</em>. {book.publisher}, {book.year}.</p></div></li>)}</ol>
    </section>

    <section className="landing-width studio-sources-section" id="original" tabIndex={-1}>
      <Reveal>
        <p className="studio-eyebrow">05 / MADE BY US</p>
        <h2>Everything else here<br /><em>we built ourselves.</em></h2>
        <p className="studio-sources-lede">Listed so you can tell our work apart from the material we sourced.</p>
      </Reveal>
      <ol className="studio-original-list">{originalWork.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ol>
    </section>

    <section className="landing-width studio-sources-section studio-sources-software" id="software" tabIndex={-1}>
      <p className="studio-eyebrow">06 / BUILT WITH</p>
      <h2>The tools behind the site.</h2>
      <p className="studio-sources-lede">These are open-source tools we used to build Signal Lab, not content shown on it. Listed for completeness.</p>
      <ul className="studio-software-list">{softwareCredits.map(tool => <li key={tool.name}><a href={tool.url} target="_blank" rel="noopener noreferrer"><strong>{tool.name}</strong><span>{tool.version}</span><span>{tool.license}</span><ArrowUpRight size={15} /><span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul>
    </section>

    <section className="landing-width studio-privacy"><Fingerprint size={38} /><div><p className="studio-eyebrow">HOW THIS PAGE STAYS HONEST</p><h2>Written from the code, not from memory.</h2><p>This page reads from the same lists the site builds from, so the icons and photographs shown here are literally the ones in use. If we add one, it appears here too.</p><p>The full written version, including file-by-file usage, lives in SOURCES.md alongside our source code.</p></div></section>

    <section className="studio-inline-cta landing-width"><div><p className="studio-eyebrow">YOUR TURN</p><h2>Checking sources is a skill.</h2><p>Our Field Guide shows you how to do this for anything AI hands you.</p></div><Link className="landing-primary" to="/field-guide">Open the Field Guide <ArrowUpRight size={18} /></Link></section>
  </main><PublicSiteFooter /></div>;
}
