import { blurBg } from './clicked-item.js';
import { fetchAllFood, fetchFoodByCategory } from '../data/data-source.js';

const loading = document.querySelector('.loading');
const cartItemContainer = document.querySelector('.cart-item-container');

function convertToRupiah(num) {
  const newCurrency = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
  return newCurrency;
}

async function showFilteredFood(category) {
  if (category === 'show-all') {
    loading.classList.add('active');
    blurBg.classList.add('active');
    await fetchAllFood();
    loading.classList.remove('active');
    blurBg.classList.remove('active');
  } else {
    fetchFoodByCategory(category);
  }
}

function showAllItemInDropDownMenu(newItem) {
  const divElement = document.createElement('div');
  const cartItemDiv = document.createElement('div');
  const itemImgDiv = document.createElement('div');
  const imgElement = document.createElement('img');
  const itemDescDiv = document.createElement('div');
  const itemNameDiv = document.createElement('div');
  const itemQtyDiv = document.createElement('div');
  const itemQtySpan = document.createElement('span');
  const itemPriceDiv = document.createElement('div');
  const eachItemPrice = newItem.price * newItem.quantity;

  cartItemContainer.appendChild(cartItemDiv);
  cartItemDiv.appendChild(divElement);
  divElement.appendChild(itemImgDiv);
  itemImgDiv.appendChild(imgElement);
  divElement.appendChild(itemDescDiv);
  itemDescDiv.appendChild(itemNameDiv);
  itemDescDiv.appendChild(itemQtyDiv);
  cartItemDiv.appendChild(itemPriceDiv);

  cartItemDiv.classList.add('cart-item');
  itemImgDiv.classList.add('item-img');
  itemDescDiv.classList.add('item-desc');
  itemNameDiv.classList.add('item-name');
  itemQtyDiv.classList.add('item-qty');
  itemPriceDiv.classList.add('cart-price');

  imgElement.src = newItem.img;
  itemNameDiv.textContent = newItem.name;
  itemQtyDiv.textContent = 'Qty ';
  itemQtySpan.textContent = `${newItem.quantity}`;
  itemQtyDiv.insertAdjacentElement('beforeend', itemQtySpan);
  itemPriceDiv.textContent = convertToRupiah(eachItemPrice);
}

function refreshItemDropDown() {
  while (cartItemContainer.firstChild) {
    cartItemContainer.removeChild(cartItemContainer.firstChild);
  }
}

export { showFilteredFood, showAllItemInDropDownMenu, convertToRupiah, refreshItemDropDown, loading };
