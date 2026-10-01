export interface CartLine {
  bookId: string;
  quantity: number;
}

export interface PlacedOrder {
  reference: string;
  placedAt: string;
  lines: CartLine[];
  totals: CartTotals;
  shipTo: { name: string; email: string; address: string; city: string; region: string; postal: string };
}

export interface CartTotals {
  itemCount: number;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  /** Set when a promo code is applied. */
  discountCents: number;
  promoCode: string | null;
}

export interface CartState {
  lines: CartLine[];
  totals: CartTotals;
  promoCode: string | null;
  /** Null until an order is placed in this browser. */
  lastOrder: PlacedOrder | null;
  isOpen: boolean;
  /** Id of the book added most recently, so the UI can flash a confirmation. */
  justAdded: string | null;
  addItem: (bookId: string, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  placeOrder: (shipTo: PlacedOrder['shipTo']) => PlacedOrder;
}
