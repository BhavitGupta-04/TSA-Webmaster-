/**
 * Checkout: card validation and the one place a payment processor would attach.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 *  NOTHING IN THIS FILE SENDS A CARD NUMBER ANYWHERE.
 *
 *  The order form is complete and the validation below is the real thing: the
 *  same Luhn check, expiry check, and brand detection a live checkout runs
 *  before it calls a processor. What is deliberately missing is the network
 *  call. `authorizePayment` resolves locally and the card number never leaves
 *  the component that typed it — it is not stored, not logged, and not put in
 *  localStorage with the rest of the cart.
 *
 *  TO CONNECT A REAL PROCESSOR (Stripe, Square, PayPal, …):
 *
 *    1. Do NOT start sending the raw card number from here. A browser that
 *       touches a real card number drags the whole site into PCI-DSS scope.
 *       Processors avoid this by giving you a hosted card field (Stripe
 *       Elements, Square Web Payments SDK) that swaps the card for a token.
 *    2. Replace the <CardFields /> inputs on the checkout page with that
 *       hosted field, and delete the `card` argument from this function.
 *    3. Have the Django backend create the payment intent — the secret API key
 *       belongs on the server, never in this bundle — and return its client
 *       secret to the browser.
 *    4. Replace the body of `authorizePayment` with the processor's confirm
 *       call, using the token and that client secret.
 *
 *  Backend route to add when that happens:
 *      POST /api/v1/orders/   → creates the order, returns { clientSecret }
 * ──────────────────────────────────────────────────────────────────────────────
 */

export const CHECKOUT_MODE: 'demo' | 'live' = 'demo';

export type CardBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Discover' | 'Card';

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export interface AuthorizationResult {
  ok: boolean;
  /** Present on success. The last four digits are all a receipt should ever keep. */
  last4?: string;
  brand?: CardBrand;
  message: string;
}

/** Groups digits the way the brand prints them, as you type. */
export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  if (detectBrand(digits) === 'American Express') {
    return digits.replace(/^(\d{1,4})(\d{1,6})?(\d{1,5})?$/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(' ')
    );
  }
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function detectBrand(value: string): CardBrand {
  const digits = value.replace(/\D/g, '');
  if (/^4/.test(digits)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'American Express';
  if (/^6(?:011|5)/.test(digits)) return 'Discover';
  return 'Card';
}

/**
 * The Luhn checksum. Every real card number satisfies it, which is why a
 * checkout can reject a typo before bothering the bank.
 */
export function passesLuhn(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 12) return false;

  let sum = 0;
  let double = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

export function validateExpiry(value: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value.trim());
  if (!match) return 'Use MM/YY.';

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return 'That month does not exist.';

  // A card is good through the last day of its expiry month.
  const expiresAfter = new Date(year, month, 1);
  if (expiresAfter <= new Date()) return 'That date has passed.';
  return '';
}

export function validateCvc(value: string, brand: CardBrand) {
  const digits = value.replace(/\D/g, '');
  const expected = brand === 'American Express' ? 4 : 3;
  if (digits.length !== expected) return `${expected} digits for ${brand}.`;
  return '';
}

export function validateCard(card: CardDetails): Record<string, string> {
  const errors: Record<string, string> = {};
  const brand = detectBrand(card.number);

  if (!card.name.trim()) errors.name = 'Add the name printed on the card.';
  if (!passesLuhn(card.number)) errors.number = 'Check that number — it does not add up.';

  const expiryError = validateExpiry(card.expiry);
  if (expiryError) errors.expiry = expiryError;

  const cvcError = validateCvc(card.cvc, brand);
  if (cvcError) errors.cvc = cvcError;

  return errors;
}

/**
 * Stands in for the processor's confirm call.
 *
 * Resolves locally after a short pause so the button's pending state behaves
 * the way it would against a real network. Returns only the last four digits,
 * which is the most a confirmation screen should ever be handed back.
 */
export async function authorizePayment(card: CardDetails, amountCents: number): Promise<AuthorizationResult> {
  const errors = validateCard(card);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: 'Check the card details above.' };
  }
  if (amountCents <= 0) {
    return { ok: false, message: 'There is nothing to pay for.' };
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  const digits = card.number.replace(/\D/g, '');
  return {
    ok: true,
    last4: digits.slice(-4),
    brand: detectBrand(digits),
    message: 'Order recorded in this browser. No payment was taken.',
  };
}
