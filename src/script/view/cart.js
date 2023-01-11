import Swal from 'sweetalert2';
import checkoutFoodListArray from '../data/food-list.js';
import { convertToRupiah, refreshItemDropDown, showAllItemInDropDownMenu } from './show-item.js';

const subTotal = document.querySelector('.subtotal');
const allItemPrice = document.querySelector('.total-all-item');
const cartCount = document.querySelector('.notif');
const tbody = document.querySelector('tbody');
const cartQty = document.querySelector('.cart-qty > span');

let totalQuantity = 0;
let totalPrice = 0;

function checkSameFood(itemName) {
  return checkoutFoodListArray.some((food) => food.name === itemName);
}

function refreshItemCheckout() {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

function countTotal() {
  totalPrice = totalQuantity * 50000;
  subTotal.textContent = convertToRupiah(totalPrice);
  allItemPrice.textContent = subTotal.textContent;
}

function showCartNotif() {
  if (cartCount.textContent !== '0') {
    cartCount.classList.add('active');
  } else {
    cartCount.classList.remove('active');
  }
}

function showAllItemInCheckout(item) {
  const newRow = document.createElement('tr');
  const productColumn = document.createElement('td');
  const quantityColumn = document.createElement('td');
  const editQuantityDiv = document.createElement('div');
  const createSubtractBtn = document.createElement('button');
  const createAddBtn = document.createElement('button');
  const quantityDiv = document.createElement('div');
  const priceColumn = document.createElement('td');
  const deleteColumn = document.createElement('td');
  const deleteBtn = document.createElement('button');
  const tableCheckoutImgElement = document.createElement('img');
  const tableCheckoutFoodName = document.createElement('div');

  tbody.appendChild(newRow);
  newRow.appendChild(productColumn);
  productColumn.appendChild(tableCheckoutImgElement);
  productColumn.appendChild(tableCheckoutFoodName);
  newRow.appendChild(quantityColumn);
  quantityColumn.appendChild(editQuantityDiv);
  editQuantityDiv.appendChild(createSubtractBtn);
  editQuantityDiv.appendChild(quantityDiv);
  editQuantityDiv.appendChild(createAddBtn);
  newRow.appendChild(priceColumn);
  newRow.appendChild(deleteColumn);
  deleteColumn.appendChild(deleteBtn);

  productColumn.classList.add('item');
  quantityColumn.classList.add('edit-quantity-container');
  tableCheckoutFoodName.classList.add('food-name');
  editQuantityDiv.classList.add('edit-quantity');
  createSubtractBtn.classList.add('subtract');
  quantityDiv.classList.add('quantity');
  createAddBtn.classList.add('add');
  priceColumn.classList.add('price');
  deleteBtn.classList.add('delete-btn');

  deleteBtn.textContent = 'x';
  createSubtractBtn.textContent = '-';
  createAddBtn.textContent = '+';

  tableCheckoutImgElement.src = item.img;
  tableCheckoutFoodName.textContent = item.name;
  quantityDiv.textContent = item.quantity;

  let quantityCountNumber = Number(quantityDiv.textContent);
  let totalPriceInTable = quantityCountNumber * item.price;
  priceColumn.textContent = convertToRupiah(totalPriceInTable);

  function setQuantityAndPrice() {
    totalPriceInTable = quantityCountNumber * item.price;
    quantityDiv.textContent = quantityCountNumber;
    priceColumn.textContent = convertToRupiah(totalPriceInTable);

    const findFood = checkoutFoodListArray.find((food) => food.name === tableCheckoutFoodName.textContent);
    findFood.quantity = quantityCountNumber;
  }

  createAddBtn.addEventListener('click', () => {
    quantityCountNumber += 1;
    setQuantityAndPrice();
    refreshItemDropDown();
    totalQuantity = 0;
    cartCount.textContent = '';
    checkoutFoodListArray.forEach((food) => {
      showAllItemInDropDownMenu(food);
      totalQuantity += food.quantity;
    });
    cartQty.textContent = totalQuantity;
    cartCount.textContent = totalQuantity;
    showCartNotif();
    countTotal();
  });

  createSubtractBtn.addEventListener('click', () => {
    if (quantityCountNumber > 1) {
      quantityCountNumber -= 1;
      setQuantityAndPrice();
      refreshItemDropDown();
      totalQuantity = 0;
      cartCount.textContent = '';
      checkoutFoodListArray.forEach((food) => {
        showAllItemInDropDownMenu(food);
        totalQuantity += food.quantity;
      });
      cartQty.textContent = totalQuantity;
      cartCount.textContent = totalQuantity;
      showCartNotif();
      countTotal();
    }
  });

  deleteBtn.addEventListener('click', () => {
    newRow.remove();
    checkoutFoodListArray.splice(
      checkoutFoodListArray.findIndex((food) => food.name === tableCheckoutFoodName.textContent),
      1,
    );
    refreshItemDropDown();
    totalQuantity = 0;
    cartCount.textContent = '';
    checkoutFoodListArray.forEach((food) => {
      showAllItemInDropDownMenu(food);
      totalQuantity += food.quantity;
    });
    cartQty.textContent = totalQuantity;
    cartCount.textContent = totalQuantity;
    showCartNotif();
    countTotal();
  });
}

function addToCart(itemImg, itemName, itemQuantity, itemPrice) {
  const newItem = {
    img: itemImg,
    name: itemName,
    quantity: itemQuantity,
    price: itemPrice,
  };

  if (itemQuantity > 0 && !checkSameFood(itemName)) {
    checkoutFoodListArray.push(newItem);
  } else {
    Swal.fire('This food already in the cart');
  }

  refreshItemDropDown();
  refreshItemCheckout();
  totalQuantity = 0;
  cartCount.textContent = '0';
  checkoutFoodListArray.forEach((food) => {
    showAllItemInDropDownMenu(food);
    showAllItemInCheckout(food);
    totalQuantity += food.quantity;
  });
  cartQty.textContent = totalQuantity;
  cartCount.textContent = totalQuantity;
  showCartNotif();
  countTotal();
}

export { addToCart, showAllItemInCheckout };
