function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const removeItemFromLocalStorage = (itemId) => {
  const arrayOfItems = getSavedCartItems();
  const newArrayOfItems = arrayOfItems.filter((item) => item.sku !== itemId);
  localStorage.removeItem('cartItems');
  localStorage.setItem('cartItems', JSON.stringify(newArrayOfItems));
};

function cartItemClickListener(event) {
  event.target.parentNode.removeChild(event.target);
  const itemId = event.target.textContent.split(' ')[1];
  removeItemFromLocalStorage(itemId);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);

  return li;
}

async function getProductsFromApi(product = 'computador') {
  const { results } = await fetchProducts(product);
  return results;
}

async function getItemFromApi(itemId) {
  const { id, title, price } = await fetchItem(itemId);
  return { id, title, price };
}

const addItem = async (itemId) => {
  const olElement = document.querySelector('.cart__items');

  const {
    id: sku,
    title: name,
    price: salePrice,
  } = await getItemFromApi(itemId);

  const element = createCartItemElement({ sku, name, salePrice });
  olElement.appendChild(element);

  saveCartItems({ sku, name, salePrice });
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
  const olElement = document.querySelector('.cart__items');
  if (!cartArray) return;
  cartArray.forEach(({ sku, name, salePrice }) => {
    const element = createCartItemElement({ sku, name, salePrice });
    olElement.appendChild(element);
  });
};

async function init() {
  const listOfProducts = await getProductsFromApi('computador');
  addProductsSection(listOfProducts);
  // const itemsLocalStorage = getSavedCartItems();
  // if (itemsLocalStorage) {
  //   itemsLocalStorage.forEach(({ sku, name, salePrice }) => {
  //     const element = createCartItemElement({ sku, name, salePrice });
  //     olElement.appendChild(element);
  //   });
  // }
}

window.onload = () => {
  init();
  getItemsFromLocalStorage();
};
