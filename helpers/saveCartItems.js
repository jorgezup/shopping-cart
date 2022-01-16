const saveCartItems = (item) => {
  const cartItems = localStorage.getItem('cartItems');

  if (!cartItems) {
    const cartArray = [];
    cartArray.push(item);
    localStorage.setItem('cartItems', JSON.stringify(cartArray));
  }
  const arrayOfItems = JSON.parse(cartItems);
  arrayOfItems.push(item);
  localStorage.setItem('cartItems', JSON.stringify(arrayOfItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
