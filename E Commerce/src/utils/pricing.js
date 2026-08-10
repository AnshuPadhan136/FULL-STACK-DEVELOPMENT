/**
 * Dynamic Pricing & Tax Calculation Utility
 */

export const SUPPORTED_COUPONS = {
  SAVE10: {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: '10% off your total order',
    minSubtotal: 0
  },
  FLAT50: {
    code: 'FLAT50',
    type: 'flat',
    value: 50,
    description: '$50 off (min subtotal $100)',
    minSubtotal: 100
  }
};

/**
 * Format numbers into clean currency strings
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

/**
 * Validates a coupon code against current subtotal
 */
export const validateCoupon = (code, subtotal) => {
  if (!code || typeof code !== 'string') {
    return { valid: false, discount: 0, message: '' };
  }

  const cleanCode = code.trim().toUpperCase();
  const coupon = SUPPORTED_COUPONS[cleanCode];

  if (!coupon) {
    return {
      valid: false,
      discount: 0,
      code: cleanCode,
      message: 'Invalid promo code. Try "SAVE10" or "FLAT50".'
    };
  }

  if (subtotal < coupon.minSubtotal) {
    return {
      valid: false,
      discount: 0,
      code: cleanCode,
      message: `Code "${cleanCode}" requires a minimum subtotal of ${formatCurrency(coupon.minSubtotal)}.`
    };
  }

  let discount = 0;
  if (coupon.type === 'percentage') {
    discount = (subtotal * coupon.value) / 100;
  } else if (coupon.type === 'flat') {
    discount = Math.min(coupon.value, subtotal);
  }

  return {
    valid: true,
    discount,
    code: cleanCode,
    coupon,
    message: `Promo code "${cleanCode}" applied successfully!`
  };
};

/**
 * Computes complete price breakdown:
 * - Subtotal
 * - Discount
 * - Taxable Amount
 * - GST (18%)
 * - Grand Total
 */
export const calculateOrderTotals = (cartItems, couponCode = '') => {
  // 1. Calculate Subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // 2. Validate & Compute Coupon Discount
  const couponResult = couponCode ? validateCoupon(couponCode, subtotal) : { valid: false, discount: 0, message: '' };
  const discount = couponResult.valid ? couponResult.discount : 0;

  // 3. Calculate Taxable Amount (Subtotal after discount)
  const taxableAmount = Math.max(0, subtotal - discount);

  // 4. Calculate 18% GST
  const gstTaxRate = 0.18;
  const gstTaxAmount = taxableAmount * gstTaxRate;

  // 5. Grand Total
  const grandTotal = taxableAmount + gstTaxAmount;

  // Total items count
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    discount,
    couponResult,
    taxableAmount,
    gstTaxRate: 18,
    gstTaxAmount,
    grandTotal,
    totalItemCount
  };
};
