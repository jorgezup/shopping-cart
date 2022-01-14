require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Should be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Should verify whether fetch has been called', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Should receive an parameter "computador" and verifiy whether the function has been called correctly', async () => {
    const query = 'computador';
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    await fetchProducts(query);

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Should receive an structure and verifiy whether this structure is the same as "computerSearch"', async () => {
    const response = await fetchProducts('computador');

    expect(response).toMatchObject(computadorSearch);
  });
  it('Should returns an error message whether the function has been called without parameters', async () => {
    const response = await fetchProducts();

    expect(response).toEqual(new Error('You must provide an url'));
  });
});
