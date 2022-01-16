const getSavedCartItems = () => {
  const cartItems = localStorage.getItem('cartItems');
  if (!cartItems) return undefined;
  const cartItemsObj = JSON.parse(cartItems);
  return cartItemsObj;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
