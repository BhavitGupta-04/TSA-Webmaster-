import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, CreditCard, Loader, Lock, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicSiteFooter, PublicSiteHeader } from '../components/PublicSiteChrome';
import BookCover from '../components/BookCover';
import { bookById, formatPrice } from '../data/books';
import { useCart } from '../state/useCart';
import {
  authorizePayment,
  detectBrand,
  formatCardNumber,
  formatExpiry,
  validateCard,
  type CardDetails,
} from '../lib/checkout';

const emptyCard: CardDetails = { number: '', expiry: '', cvc: '', name: '' };
const emptyShipping = { name: '', email: '', address: '', city: '', region: '', postal: '' };

export default function CheckoutPage() {
  const { lines, totals, placeOrder } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState(emptyShipping);
  const [card, setCard] = useState<CardDetails>(emptyCard);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const brand = detectBrand(card.number);
  const empty = lines.length === 0;

  function updateShipping(field: keyof typeof emptyShipping, value: string) {
    setShipping((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  function validateShipping() {
    const found: Record<string, string> = {};
    if (!shipping.name.trim()) found.name = 'Who is this order for?';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(shipping.email.trim())) found.email = 'Enter an email we could send a receipt to.';
    if (!shipping.address.trim()) found.address = 'Add a street address.';
    if (!shipping.city.trim()) found.city = 'Add a city.';
    if (!shipping.region.trim()) found.region = 'Add a state or region.';
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(shipping.postal.trim())) found.postal = 'Check the postal code.';
    return found;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || empty) return;

    const found = { ...validateShipping(), ...validateCard(card) };
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('Some details need another look.');
      return;
    }

    setBusy(true);
    setStatus('');

    const result = await authorizePayment(card, totals.totalCents);
    if (!result.ok) {
      setBusy(false);
      setStatus(result.message);
      return;
    }

    const order = placeOrder(shipping);
    // The card object goes out of scope here and is never persisted.
    setCard(emptyCard);
    navigate(`/order-confirmed?ref=${order.reference}`);
  }

  return (
    <div className="signal-landing studio-interior checkout-page">
      <PublicSiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="landing-width checkout-top">
          <Link className="studio-text-button" to="/reading-list"><ArrowLeft size={16} /> Back to the Reading List</Link>
          <h1>Checkout</h1>
          <div className="checkout-demo-banner">
            <ShieldCheck size={19} />
            <p>
              <strong>Demonstration only.</strong> This form validates everything a real checkout validates, including the card
              number's checksum — but there is no payment processor attached. Nothing is charged, nothing is transmitted, and your
              card number is never saved. Use a test number such as <code>4242 4242 4242 4242</code>.
            </p>
          </div>
        </section>

        {empty ? (
          <section className="landing-width checkout-empty">
            <h2>Your cart is empty.</h2>
            <p>Add a book and the checkout will have something to work with.</p>
            <Link className="landing-primary" to="/reading-list">Browse the Reading List <ArrowRight size={17} /></Link>
          </section>
        ) : (
          <section className="landing-width checkout-layout">
            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend><span>01</span> Where it would ship</legend>
                <div className="checkout-field">
                  <label htmlFor="ship-name">Full name</label>
                  <input id="ship-name" value={shipping.name} autoComplete="name" onChange={(event) => updateShipping('name', event.target.value)} aria-invalid={Boolean(errors.name)} />
                  {errors.name && <span className="checkout-error">{errors.name}</span>}
                </div>
                <div className="checkout-field">
                  <label htmlFor="ship-email">Email</label>
                  <input id="ship-email" type="email" value={shipping.email} autoComplete="email" onChange={(event) => updateShipping('email', event.target.value)} aria-invalid={Boolean(errors.email)} />
                  {errors.email && <span className="checkout-error">{errors.email}</span>}
                </div>
                <div className="checkout-field">
                  <label htmlFor="ship-address">Street address</label>
                  <input id="ship-address" value={shipping.address} autoComplete="street-address" onChange={(event) => updateShipping('address', event.target.value)} aria-invalid={Boolean(errors.address)} />
                  {errors.address && <span className="checkout-error">{errors.address}</span>}
                </div>
                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="ship-city">City</label>
                    <input id="ship-city" value={shipping.city} autoComplete="address-level2" onChange={(event) => updateShipping('city', event.target.value)} aria-invalid={Boolean(errors.city)} />
                    {errors.city && <span className="checkout-error">{errors.city}</span>}
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="ship-region">State / region</label>
                    <input id="ship-region" value={shipping.region} autoComplete="address-level1" onChange={(event) => updateShipping('region', event.target.value)} aria-invalid={Boolean(errors.region)} />
                    {errors.region && <span className="checkout-error">{errors.region}</span>}
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="ship-postal">Postal code</label>
                    <input id="ship-postal" value={shipping.postal} autoComplete="postal-code" onChange={(event) => updateShipping('postal', event.target.value)} aria-invalid={Boolean(errors.postal)} />
                    {errors.postal && <span className="checkout-error">{errors.postal}</span>}
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend><span>02</span> Payment</legend>
                <p className="checkout-card-note">
                  <Lock size={14} /> In a live shop these four fields are replaced by the processor's own hosted inputs, so the card
                  number never touches our code. Here they are ours, and they go nowhere.
                </p>
                <div className="checkout-field">
                  <label htmlFor="card-name">Name on card</label>
                  <input id="card-name" value={card.name} autoComplete="off" onChange={(event) => { setCard({ ...card, name: event.target.value }); setErrors({ ...errors, name: '' }); }} aria-invalid={Boolean(errors.name)} />
                </div>
                <div className="checkout-field">
                  <label htmlFor="card-number">Card number <span className="checkout-brand">{brand !== 'Card' ? brand : ''}</span></label>
                  <div className="checkout-card-input">
                    <CreditCard size={17} />
                    <input
                      id="card-number"
                      inputMode="numeric"
                      autoComplete="off"
                      value={card.number}
                      placeholder="4242 4242 4242 4242"
                      onChange={(event) => { setCard({ ...card, number: formatCardNumber(event.target.value) }); setErrors({ ...errors, number: '' }); }}
                      aria-invalid={Boolean(errors.number)}
                    />
                  </div>
                  {errors.number && <span className="checkout-error">{errors.number}</span>}
                </div>
                <div className="checkout-row">
                  <div className="checkout-field">
                    <label htmlFor="card-expiry">Expiry</label>
                    <input id="card-expiry" inputMode="numeric" autoComplete="off" placeholder="MM/YY" value={card.expiry} onChange={(event) => { setCard({ ...card, expiry: formatExpiry(event.target.value) }); setErrors({ ...errors, expiry: '' }); }} aria-invalid={Boolean(errors.expiry)} />
                    {errors.expiry && <span className="checkout-error">{errors.expiry}</span>}
                  </div>
                  <div className="checkout-field">
                    <label htmlFor="card-cvc">Security code</label>
                    <input id="card-cvc" inputMode="numeric" autoComplete="off" maxLength={4} placeholder={brand === 'American Express' ? '1234' : '123'} value={card.cvc} onChange={(event) => { setCard({ ...card, cvc: event.target.value.replace(/\D/g, '') }); setErrors({ ...errors, cvc: '' }); }} aria-invalid={Boolean(errors.cvc)} />
                    {errors.cvc && <span className="checkout-error">{errors.cvc}</span>}
                  </div>
                </div>
              </fieldset>

              <div className="checkout-submit">
                <button className="landing-primary" type="submit" disabled={busy}>
                  {busy ? <><Loader size={17} className="checkout-spinner" /> Working…</> : <>Place order <ArrowRight size={17} /></>}
                </button>
                <p role="status" className="checkout-status">{status}</p>
              </div>
            </form>

            <aside className="checkout-summary">
              <h2>Order summary</h2>
              <ul>
                {lines.map((line) => {
                  const book = bookById[line.bookId];
                  if (!book) return null;
                  return (
                    <li key={line.bookId}>
                      <BookCover book={book} size="small" />
                      <div>
                        <strong>{book.title}</strong>
                        <span>{book.author}</span>
                        <span>Qty {line.quantity}</span>
                      </div>
                      <span className="checkout-line-price">{formatPrice(book.priceCents * line.quantity)}</span>
                    </li>
                  );
                })}
              </ul>
              <dl className="checkout-totals">
                <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotalCents)}</dd></div>
                {totals.discountCents > 0 && <div className="checkout-discount"><dt>Discount ({totals.promoCode})</dt><dd>−{formatPrice(totals.discountCents)}</dd></div>}
                <div><dt>Shipping</dt><dd>{totals.shippingCents === 0 ? 'Free' : formatPrice(totals.shippingCents)}</dd></div>
                <div><dt>Estimated tax</dt><dd>{formatPrice(totals.taxCents)}</dd></div>
                <div className="checkout-grand"><dt>Total</dt><dd>{formatPrice(totals.totalCents)}</dd></div>
              </dl>
              <p className="checkout-summary-note"><Check size={14} /> Totals are calculated in your browser from the catalogue prices.</p>
            </aside>
          </section>
        )}
      </main>
      <PublicSiteFooter />
    </div>
  );
}
