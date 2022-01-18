const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Testa se ao executar a função com o argumento especificado, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Testa se ao executar a função com o argumento especificado, o método localStorage.setItem é chamado com o parâmetro cartItems e o valor passado', () => {
    const item = '<ol><li>Item</li></ol>';
    saveCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cartItems',
      JSON.stringify(item),
    );
  });
});
