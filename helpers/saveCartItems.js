// const getSavedCartItems = require('./getSavedCartItems');

const saveCartItems = (arrayOfItems) => {
  localStorage.setItem('cartItems', JSON.stringify(arrayOfItems));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
