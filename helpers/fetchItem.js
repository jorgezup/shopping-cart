const getURLItem = (itemId) => `https://api.mercadolibre.com/items/${itemId}`;

const fetchItem = async (itemId) => {
  try {
    const url = getURLItem(itemId);
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
