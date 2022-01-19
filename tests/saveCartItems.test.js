const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Should runs saveCartItems with an argument and expect that localStorage with setItem haveBeenCalled', () => {
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Should runs saveCartItems with an argument and expect that localStorage with setItem haveBeenCalledWith "cartItems" and the item ', () => {
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cartItems',
      JSON.stringify(item),
    );
  });
});
