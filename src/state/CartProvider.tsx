import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { bookById } from '../data/books';
import type { CartLine, CartTotals, PlacedOrder } from '../types/cart';
import { CartContext } from './cart-context';

const CART_KEY = 'signal-lab-cart';
const ORDER_KEY = 'signal-lab-last-order';

/** Flat rate, in cents. Free once the subtotal clears the threshold. */
const SHIPPING_CENTS = 499;
const FREE_SHIPPING_OVER_CENTS = 5000;
/** A stand-in sales-tax rate so the arithmetic on screen is real. */
const TAX_RATE = 0.0675;

/** Codes are checked here in the browser. A real shop checks them on a server. */
const PROMO_CODES: Record<string, { percent: number; label: string }> = {
  TSA2026: { percent: 15, label: '15% student rate' },
  SIGNAL10: { percent: 10, label: '10% off your first order' },
};

function readLines(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = window.localStorage.getItem(CART_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is CartLine =>
          Boolean(line) &&
          typeof line === 'object' &&
          typeof (line as CartLine).bookId === 'string' &&
          typeof (line as CartLine).quantity === 'number' &&
          // Drop a saved line whose book has since left the catalogue.
          Boolean(bookById[(line as CartLine).bookId])
      )
      .map((line) => ({ bookId: line.bookId, quantity: clampQuantity(line.quantity) }));
  } catch {
    return [];
  }
}

function readLastOrder(): PlacedOrder | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem(ORDER_KEY);
    return saved ? (JSON.parse(saved) as PlacedOrder) : null;
  } catch {
    return null;
  }
}

function clampQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(99, Math.max(1, Math.round(quantity)));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readLines);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(readLastOrder);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines]);

  // Clear the "added" flash after it has had time to be seen.
  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(null), 2200);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  const totals: CartTotals = useMemo(() => {
    const subtotalCents = lines.reduce((sum, line) => {
      const book = bookById[line.bookId];
      return book ? sum + book.priceCents * line.quantity : sum;
    }, 0);
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

    const promo = promoCode ? PROMO_CODES[promoCode] : undefined;
    const discountCents = promo ? Math.round((subtotalCents * promo.percent) / 100) : 0;
    const discounted = subtotalCents - discountCents;

    const shippingCents =
      itemCount === 0 || discounted >= FREE_SHIPPING_OVER_CENTS ? 0 : SHIPPING_CENTS;
    const taxCents = Math.round(discounted * TAX_RATE);

    return {
      itemCount,
      subtotalCents,
      discountCents,
      promoCode,
      shippingCents,
      taxCents,
      totalCents: discounted + shippingCents + taxCents,
    };
  }, [lines, promoCode]);

  const addItem = useCallback((bookId: string, quantity = 1) => {
    if (!bookById[bookId]) return;
    setLines((current) => {
      const existing = current.find((line) => line.bookId === bookId);
      if (existing) {
        return current.map((line) =>
          line.bookId === bookId ? { ...line, quantity: clampQuantity(line.quantity + quantity) } : line
        );
      }
      return [...current, { bookId, quantity: clampQuantity(quantity) }];
    });
    setJustAdded(bookId);
  }, []);

  const value = useMemo(
    () => ({
      lines,
      totals,
      promoCode,
      isOpen,
      justAdded,
      lastOrder,
      addItem,
      removeItem: (bookId: string) => setLines((current) => current.filter((line) => line.bookId !== bookId)),
      setQuantity: (bookId: string, quantity: number) =>
        setLines((current) =>
          quantity <= 0
            ? current.filter((line) => line.bookId !== bookId)
            : current.map((line) => (line.bookId === bookId ? { ...line, quantity: clampQuantity(quantity) } : line))
        ),
      clearCart: () => {
        setLines([]);
        setPromoCode(null);
      },
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      applyPromo: (code: string) => {
        const normalized = code.trim().toUpperCase();
        if (!normalized) return { ok: false, message: 'Enter a code first.' };
        const promo = PROMO_CODES[normalized];
        if (!promo) return { ok: false, message: `${normalized} is not a code we recognize.` };
        setPromoCode(normalized);
        return { ok: true, message: `${normalized} applied — ${promo.label}.` };
      },
      clearPromo: () => setPromoCode(null),
      placeOrder: (shipTo: PlacedOrder['shipTo']) => {
        const order: PlacedOrder = {
          reference: `SL-${Date.now().toString(36).toUpperCase().slice(-6)}`,
          placedAt: new Date().toISOString(),
          lines,
          totals,
          shipTo,
        };
        setLastOrder(order);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
        }
        setLines([]);
        setPromoCode(null);
        return order;
      },
    }),
    [lines, totals, promoCode, isOpen, justAdded, lastOrder, addItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
