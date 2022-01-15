require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Should be a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Should verify whether fetch has been called', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Should receive an parameter "MLB1615760527" and verify whether the function has been called correctly', async () => {
    const itemId = 'MLB1615760527';
    const endpoint = `https://api.mercadolibre.com/items/${itemId}`;
    await fetchItem(itemId);

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Should receive an structure and verify wheter this structure is the same as "item"', async () => {
    const response = await fetchItem('MLB1615760527');

    expect(response).toMatchObject(item);
  });
  it('Should returns an error message wheter the function has been called without parameters', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
