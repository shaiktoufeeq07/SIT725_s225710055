// helpers.js
// This file contains reusable calculation functions

/**
 * Calculates the discounted price of a book
 * @param {number} price - Original price of the book
 * @param {number} discountPercent - Discount percentage (0–100)
 * @returns {number} - Final price after discount, rounded to 2 decimal places
 **/
function calculateDiscountedPrice(price, discountPercent) {
  if (typeof price !== "number" || typeof discountPercent !== "number") {
    throw new Error("Price and discount must be numbers");
  }
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount must be between 0 and 100");
  }

  const discountAmount = (price * discountPercent) / 100;
  const finalPrice = price - discountAmount;
  return Math.round(finalPrice * 100) / 100;
}

module.exports = { calculateDiscountedPrice };