const getURL = (query) =>
  `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

const fetchProducts = async (query) => {
  try {
    const url = getURL(query);
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
