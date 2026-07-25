// The catalog API (DummyJSON) quotes prices in USD. Harsha's is an India-facing
// budget store, so every price is converted to INR at a fixed rate and the
// catalog is capped at MAX_PRICE_INR — anything pricier is filtered out of the
// listings rather than shown and rejected at checkout.

export const USD_TO_INR = 83;
export const MAX_PRICE_INR = 20000;

/** Free-delivery threshold, in rupees. */
export const FREE_SHIPPING_INR = 499;

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Convert a USD catalog price to rupees. */
export const toINR = (usd: number): number => usd * USD_TO_INR;

/** Format a USD catalog price as INR — 9.99 becomes "₹829". */
export const formatPrice = (usd: number): string => formatter.format(toINR(usd));

/** Format an amount that is already in rupees (thresholds, banners). */
export const formatINR = (inr: number): string => formatter.format(inr);

/** True when a product sits under the store's price ceiling. */
export const isAffordable = (product: { price: number }): boolean =>
  toINR(product.price) <= MAX_PRICE_INR;

/** Drop everything above the price ceiling, preserving order. */
export const filterAffordable = <T extends { price: number }>(
  products: T[]
): T[] => products.filter(isAffordable);
