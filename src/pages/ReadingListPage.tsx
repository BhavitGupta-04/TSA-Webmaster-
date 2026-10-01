import { useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Check, Info, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import Reveal from '../components/Reveal';
import SitePhoto from '../components/SitePhoto';
import BookCover from '../components/BookCover';
import { bookCatalog, bookLevels, formatPrice, type BookLevel } from '../data/books';
import { learningModules } from '../data/learningModules';
import { useCart } from '../state/useCart';

const moduleTitle = Object.fromEntries(learningModules.map((module) => [module.id, module.title]));

export default function ReadingListPage() {
  const [level, setLevel] = useState<BookLevel | 'All'>('All');
  const { addItem, openCart, justAdded, lines } = useCart();

  const shown = useMemo(
    () => (level === 'All' ? bookCatalog : bookCatalog.filter((book) => book.level === level)),
    [level]
  );

  const inCart = (id: string) => lines.some((line) => line.bookId === id);

  return (
    <div className="signal-landing studio-interior shop-page">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="studio-page-hero shop-hero">
          <div className="landing-width shop-hero-layout">
            <div>
              <p className="studio-eyebrow"><BookOpen size={17} /> THE READING LIST</p>
              <h1>Eight books that<br /><em>made this click.</em></h1>
              <p>The lessons here take about an hour. These take longer, and go further. Every one of them is readable without a computer-science background — we checked.</p>
              <div className="shop-hero-actions">
                <a className="landing-primary" href="#catalog">Browse the shelf <ArrowUpRight size={18} /></a>
                <span>{bookCatalog.length} titles <i /> Paperback <i /> Ships nowhere, see below</span>
              </div>
            </div>
            <SitePhoto id="reading-shelf" shape="tall" caption="Still the best interface for a long idea." priority />
          </div>
        </section>

        <section className="shop-notice-band">
          <div className="landing-width shop-notice">
            <Info size={20} />
            <div>
              <strong>This shop is a demonstration.</strong>
              <p>
                The cart, the promo codes, the tax and shipping arithmetic, and the checkout form are all real and all run in your
                browser. What is deliberately missing is a payment processor — no card is charged, no order is transmitted, and
                nothing ships. We are not affiliated with these authors or publishers. Borrow these from a library; that part is free.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-width shop-catalog" id="catalog" tabIndex={-1}>
          <Reveal>
            <div className="shop-catalog-heading">
              <div>
                <p className="studio-eyebrow">SORTED BY HOW MUCH THEY ASSUME</p>
                <h2>Start anywhere.<br /><em>Finish something.</em></h2>
              </div>
              <div className="shop-filters" role="group" aria-label="Filter books by level">
                {(['All', ...bookLevels] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={level === option ? 'is-active' : ''}
                    aria-pressed={level === option}
                    onClick={() => setLevel(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <p className="studio-result-count" role="status">
            {shown.length} {shown.length === 1 ? 'book' : 'books'}{level === 'All' ? '' : ` in ${level}`}
          </p>

          <div className="shop-grid">
            {shown.map((book) => (
              <article className="shop-card" key={book.id}>
                <BookCover book={book} />
                <div className="shop-card-body">
                  <span className="shop-card-level">{book.level}</span>
                  <h3>{book.title}</h3>
                  {book.subtitle && <p className="shop-card-subtitle">{book.subtitle}</p>}
                  <p className="shop-card-author">
                    {book.author} <span>·</span> {book.publisher}, {book.year}
                  </p>
                  <p className="shop-card-blurb">{book.blurb}</p>
                  <p className="shop-card-pairs">
                    Pairs with <Link to={`/learn?module=${book.pairsWith}`}>{moduleTitle[book.pairsWith]}</Link>
                  </p>
                  <div className="shop-card-buy">
                    <span className="shop-price">{formatPrice(book.priceCents)}</span>
                    <button
                      type="button"
                      className={`shop-add ${justAdded === book.id ? 'is-added' : ''}`}
                      onClick={() => addItem(book.id)}
                    >
                      {justAdded === book.id ? <><Check size={16} /> Added</> : inCart(book.id) ? <><Plus size={16} /> Add another</> : <><Plus size={16} /> Add to cart</>}
                    </button>
                  </div>
                  <p className="shop-card-isbn">ISBN {book.isbn}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="shop-cart-nudge">
            <ShoppingBag size={20} />
            <p>Everything in your cart stays in this browser. Nothing is sent anywhere.</p>
            <button type="button" className="studio-text-button" onClick={openCart}>
              Open your cart <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        <section className="studio-inline-cta landing-width">
          <div>
            <p className="studio-eyebrow">PREFER SOMETHING FREE?</p>
            <h2>The resource library costs nothing.</h2>
            <p>Lessons and explainers from educational organizations, all open in your browser.</p>
          </div>
          <Link className="landing-primary" to="/resources">Open the resource library <ArrowUpRight size={18} /></Link>
        </section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
