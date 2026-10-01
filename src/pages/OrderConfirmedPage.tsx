import { ArrowUpRight, BookOpen, CheckCircle2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import BookCover from '../components/BookCover';
import { bookById, formatPrice } from '../data/books';
import { useCart } from '../state/useCart';

export default function OrderConfirmedPage() {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="signal-landing studio-interior">
        <PublicSiteHeader />
        <main id="main-content" tabIndex={-1}>
          <section className="landing-width checkout-empty">
            <h2>No recent order in this browser.</h2>
            <p>Orders are recorded locally, so this page is empty until you place one here.</p>
            <Link className="landing-primary" to="/reading-list">Browse the Reading List <ArrowUpRight size={17} /></Link>
          </section>
        </main>
        <PublicSiteFooter />
      </div>
    );
  }

  const placed = new Date(lastOrder.placedAt);

  return (
    <div className="signal-landing studio-interior order-page">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="landing-width order-hero">
          <span className="order-tick"><CheckCircle2 size={34} /></span>
          <p className="studio-eyebrow">ORDER {lastOrder.reference}</p>
          <h1>That's the whole flow,<br /><em>end to end.</em></h1>
          <p>
            Placed {placed.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} at{' '}
            {placed.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} for {lastOrder.shipTo.name}.
          </p>
        </section>

        <section className="landing-width order-receipt">
          <div className="order-demo-note">
            <Info size={19} />
            <p>
              <strong>Nothing was charged and nothing is coming.</strong> This receipt was written to your browser's local storage
              when you pressed the button — it is the last step of the demonstration, not a purchase. Your card details were
              validated and then discarded. To read these books, try a library.
            </p>
          </div>

          <div className="order-receipt-grid">
            <div>
              <h2>What you ordered</h2>
              <ul className="order-lines">
                {lastOrder.lines.map((line) => {
                  const book = bookById[line.bookId];
                  if (!book) return null;
                  return (
                    <li key={line.bookId}>
                      <BookCover book={book} size="small" />
                      <div>
                        <strong>{book.title}</strong>
                        <span>{book.author}</span>
                        <span>Qty {line.quantity} · ISBN {book.isbn}</span>
                      </div>
                      <span className="checkout-line-price">{formatPrice(book.priceCents * line.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <aside>
              <h2>Totals</h2>
              <dl className="checkout-totals">
                <div><dt>Subtotal</dt><dd>{formatPrice(lastOrder.totals.subtotalCents)}</dd></div>
                {lastOrder.totals.discountCents > 0 && (
                  <div className="checkout-discount"><dt>Discount ({lastOrder.totals.promoCode})</dt><dd>−{formatPrice(lastOrder.totals.discountCents)}</dd></div>
                )}
                <div><dt>Shipping</dt><dd>{lastOrder.totals.shippingCents === 0 ? 'Free' : formatPrice(lastOrder.totals.shippingCents)}</dd></div>
                <div><dt>Estimated tax</dt><dd>{formatPrice(lastOrder.totals.taxCents)}</dd></div>
                <div className="checkout-grand"><dt>Total</dt><dd>{formatPrice(lastOrder.totals.totalCents)}</dd></div>
              </dl>
              <h2 className="order-ship-heading">Shipping to</h2>
              <address className="order-address">
                {lastOrder.shipTo.name}<br />
                {lastOrder.shipTo.address}<br />
                {lastOrder.shipTo.city}, {lastOrder.shipTo.region} {lastOrder.shipTo.postal}<br />
                <span>{lastOrder.shipTo.email}</span>
              </address>
            </aside>
          </div>
        </section>

        <section className="studio-inline-cta landing-width">
          <div>
            <p className="studio-eyebrow">WHILE YOU WAIT FOR A BOOK THAT ISN'T COMING</p>
            <h2>There's a chapter you haven't finished.</h2>
            <p>Four modules, 750 XP, and a badge for each one.</p>
          </div>
          <Link className="landing-primary" to="/learn"><BookOpen size={17} /> Back to the lessons</Link>
        </section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
