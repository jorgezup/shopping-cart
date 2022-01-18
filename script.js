const olElement = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

// const getSkuFromProductItem = (item) =>
//   item.querySelector('span.item__sku').innerText;

const sumTotalPrices = () => {
  const arrayOfItems = getSavedCartItems();

  if (arrayOfItems) {
    console.log(arrayOfItems);
    const totalPrice = arrayOfItems.reduce(
      (acc, item) => acc + item.salePrice,
      0,
    );
    return totalPrice;
  }
  return 0;
};

const updateTotalPrice = () => {
  const spanElement = document.querySelector('.total-price');
  console.log(sumTotalPrices());
  spanElement.textContent = sumTotalPrices();
};

const removeItemFromLocalStorage = (itemId) => {
  const arrayOfItems = getSavedCartItems();
  const newArrayOfItems = arrayOfItems.filter((item) => item.sku !== itemId);
  localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', JSON.stringify(newArrayOfItems));
  updateTotalPrice();
};

const cartItemClickListener = (event) => {
  event.target.parentNode.removeChild(event.target);
  const itemId = event.target.textContent.split(' ')[1];
  removeItemFromLocalStorage(itemId);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
};

const getProductsFromApi = async (product = 'computador') => {
  const { results } = await fetchProducts(product);
  return results;
};

const getItemFromApi = async (itemId) => {
  const { id, title, price } = await fetchItem(itemId);
  return { id, title, price };
};

const addItem = async (itemId) => {
  const {
    id: sku,
    title: name,
    price: salePrice,
  } = await getItemFromApi(itemId);

  const element = createCartItemElement({ sku, name, salePrice });
  olElement.appendChild(element);

  saveCartItems({ sku, name, salePrice });
  await updateTotalPrice();
};

const addProductsSection = (arrayComputers) => {
  const sectionItems = document.querySelector('.items');
  arrayComputers.forEach((computer) => {
    const objComputer = {
      sku: computer.id,
      name: computer.title,
      image: computer.thumbnail,
    };
    const element = createProductItemElement(objComputer);

    /* Insert function onClick each button */
    const btnAddToCart = element.lastChild;
    btnAddToCart.setAttribute('id', computer.id);
    btnAddToCart.addEventListener('click', () => addItem(computer.id));

    sectionItems.appendChild(element);
  });
};

const getItemsFromLocalStorage = () => {
  const cartArray = getSavedCartItems();
  if (!cartArray) return;
  cartArray.forEach(({ sku, name, salePrice }) => {
    const element = createCartItemElement({ sku, name, salePrice });
    olElement.appendChild(element);
  });
};

const createSpanElement = () => {
  const sectionCart = document.querySelector('.cart');
  const spanElement = document.createElement('span');
  spanElement.classList.add('total-price');
  sectionCart.appendChild(spanElement);
  spanElement.textContent = sumTotalPrices();
};

const emptyCartBtn = document.querySelector('.empty-cart');

const cleanCart = () => {
  localStorage.removeItem('cartItems');
  olElement.innerHTML = '';
  updateTotalPrice();
};

const init = async () => {
  const listOfProducts = await getProductsFromApi('computador');
  addProductsSection(listOfProducts);

  emptyCartBtn.addEventListener('click', cleanCart);

  createSpanElement();
};

window.onload = () => {
  init();
  getItemsFromLocalStorage();
};
