import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bookById, formatPrice } from '../data/books';
import { useCart } from '../state/useCart';
import BookCover from './BookCover';

export default function CartDrawer() {
  const { lines, totals, isOpen, closeCart, setQuantity, removeItem, applyPromo, clearPromo, promoCode } = useCart();
  const [code, setCode] = useState('');
  const [promoNote, setPromoNote] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeCart();
    }
    document.addEventListener('keydown', onKeyDown);

    // Stop the page behind the drawer from scrolling with it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) closeCart(); }}>
      <aside className="cart-drawer" ref={panelRef} role="dialog" aria-modal="true" aria-label="Your cart">
        <header className="cart-drawer-header">
          <div>
            <span className="studio-eyebrow">YOUR CART</span>
            <h2>{totals.itemCount === 0 ? 'Nothing here yet' : `${totals.itemCount} ${totals.itemCount === 1 ? 'book' : 'books'}`}</h2>
          </div>
          <button ref={closeRef} type="button" className="cart-close" onClick={closeCart} aria-label="Close cart">
            <X size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={34} strokeWidth={1.3} />
            <p>Your cart is empty.</p>
            <Link className="landing-primary" to="/reading-list" onClick={closeCart}>
              Browse the Reading List <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((line) => {
                const book = bookById[line.bookId];
                if (!book) return null;
                return (
                  <li key={line.bookId}>
                    <BookCover book={book} size="small" />
                    <div className="cart-line-body">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <div className="cart-line-controls">
                        <div className="cart-stepper">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${book.title}`}
                            onClick={() => setQuantity(line.bookId, line.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span aria-live="polite">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${book.title}`}
                            onClick={() => setQuantity(line.bookId, line.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="cart-line-price">{formatPrice(book.priceCents * line.quantity)}</span>
                        <button
                          type="button"
                          className="cart-remove"
                          aria-label={`Remove ${book.title} from cart`}
                          onClick={() => removeItem(line.bookId)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="cart-promo">
              <label htmlFor="cart-promo-input"><Tag size={14} /> Promo code</label>
              {promoCode ? (
                <div className="cart-promo-applied">
                  <strong>{promoCode}</strong>
                  <button type="button" onClick={() => { clearPromo(); setPromoNote(''); setCode(''); }}>Remove</button>
                </div>
              ) : (
                <div className="cart-promo-row">
                  <input
                    id="cart-promo-input"
                    value={code}
                    onChange={(event) => { setCode(event.target.value); setPromoNote(''); }}
                    placeholder="TSA2026"
                    maxLength={20}
                    autoComplete="off"
                  />
                  <button type="button" onClick={() => setPromoNote(applyPromo(code).message)}>Apply</button>
                </div>
              )}
              <p role="status" className="cart-promo-note">{promoNote || 'Students: try TSA2026.'}</p>
            </div>

            <div className="cart-totals">
              <div><span>Subtotal</span><span>{formatPrice(totals.subtotalCents)}</span></div>
              {totals.discountCents > 0 && (
                <div className="cart-discount"><span>Discount ({totals.promoCode})</span><span>−{formatPrice(totals.discountCents)}</span></div>
              )}
              <div>
                <span>Shipping</span>
                <span>{totals.shippingCents === 0 ? 'Free' : formatPrice(totals.shippingCents)}</span>
              </div>
              <div><span>Estimated tax</span><span>{formatPrice(totals.taxCents)}</span></div>
              <div className="cart-total-row"><span>Total</span><span>{formatPrice(totals.totalCents)}</span></div>
            </div>

            <div className="cart-drawer-footer">
              <Link className="landing-primary cart-checkout" to="/checkout" onClick={closeCart}>
                Checkout <ArrowRight size={17} />
              </Link>
              <p>Demonstration checkout. No card is charged and nothing ships.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
