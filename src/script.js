import { fetchPopularFood, fetchAllFood, fetchFoodByCategory, fetchFoodByName, allFoodElement } from './script/data/data-source.js';
import { foodDetails, blurBg, bodyHtml, foodImgSrc, foodName, foodPrice } from './script/view/clicked-item.js';
import './assets/styles/styles.css';
import logo from './assets/images/logo_1.png';
import search from './assets/images/icons8-search-30.png';
import serviceOne from './assets/images/service_logo_1.png';
import serviceTwo from './assets/images/service_logo_2_edited.png';
import serviceThree from './assets/images/service_logo_3_edited.png';
import serviceFour from './assets/images/service_logo_4_edited.png';
import github from './assets/images/github_logo.png';
import email from './assets/images/mail_logo_edited.png';

const checkoutFoodListArray = [];
const mainElement = document.querySelector('main');
const tbody = document.querySelector('tbody');
const subTotal = document.querySelector('.subtotal');
const allItemPrice = document.querySelector('.total-all-item');
const cartCount = document.querySelector('.notif');
const checkoutButton = document.querySelector('.checkout');
const checkoutContent = document.querySelector('.checkout-content');
const menus = document.querySelectorAll('nav > li > a');
const continueShopping = document.querySelectorAll('.continue-shopping');
const foodDetail = document.querySelector('.food-detail');
const foodQuantity = foodDetail.querySelector('.quantity');
const allFoodListBtn = document.querySelectorAll('.all-food-list');
const homePageSection = document.querySelector('.homepage');
const servicesSection = document.querySelector('.services');
const foodListSection = document.querySelector('.food-list');
const loading = document.querySelector('.loading');
const dropDownMenu = document.querySelectorAll('.link');
const searchField = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const hamburgerBtn = document.querySelector('.fa-bars');
const hamburgerMenuContainer = document.querySelector('.hamburger-menu-container');
const hamburgerMenu = document.querySelectorAll('.hamburger-menu-container > a');
const cartItemContainer = document.querySelector('.cart-item-container');
const cartQty = document.querySelector('.cart-qty > span');
const logoImg = document.getElementById('logo');
const searchIcon = document.getElementById('search-icon');
const serviceLogoOne = document.getElementById('service-logo-one');
const serviceLogoTwo = document.getElementById('service-logo-two');
const serviceLogoThree = document.getElementById('service-logo-three');
const serviceLogoFour = document.getElementById('service-logo-four');
const githubIcon = document.getElementById('github-icon');
const emailIcon = document.getElementById('email-icon');

logoImg.src = logo;
searchIcon.src = search;
serviceLogoOne.src = serviceOne;
serviceLogoTwo.src = serviceTwo;
serviceLogoThree.src = serviceThree;
serviceLogoFour.src = serviceFour;
githubIcon.src = github;
emailIcon.src = email;

let hamburgerBtnToggle = true;
let foodQuantityNumber = Number(foodQuantity.textContent);
let totalQuantity = 0;
let totalPrice = 0;

hamburgerBtn.addEventListener('click', () => {
  if (hamburgerBtnToggle) {
    hamburgerMenuContainer.classList.add('active');
    bodyHtml.style.overflow = 'hidden';
  } else {
    hamburgerMenuContainer.classList.remove('active');
    bodyHtml.style.overflow = '';
  }
  hamburgerBtnToggle = !hamburgerBtnToggle;
});

searchBtn.addEventListener('click', () => {
  homePageSection.classList.add('active');
  servicesSection.classList.add('active');
  foodListSection.classList.add('active');
  allFoodElement.style.display = 'inline';
  const selectAllFoodElement = document.querySelector('all-food');
  const selectElementShadowDOM = selectAllFoodElement.shadowRoot.querySelector('.food-card-container');
  while (selectElementShadowDOM.firstChild) {
    selectElementShadowDOM.firstChild.remove();
  }
  fetchFoodByName(searchField.value);
  searchField.value = '';
});

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

document.addEventListener('DOMContentLoaded', async () => {
  mainElement.appendChild(allFoodElement);
  loading.classList.add('active');
  blurBg.classList.add('active');
  fetchPopularFood();
  await fetchAllFood();
  loading.classList.remove('active');
  blurBg.classList.remove('active');
});

// SHOW CART NOTIF (RED DOT)
function showCartNotif() {
  if (cartCount.textContent !== '0') {
    cartCount.classList.add('active');
  } else {
    cartCount.classList.remove('active');
  }
}

// FUNCTION TO CONVERT NUMBER INTO IDR
function convertToRupiah(num) {
  const newCurrency = Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
  return newCurrency;
}

// FUNCTION TO COUNT TOTAL PRICE OF ALL ITEMS IN CHECKOUT CONTAINER
function countTotal() {
  totalPrice = totalQuantity * 50000;
  subTotal.textContent = convertToRupiah(totalPrice);
  allItemPrice.textContent = subTotal.textContent;
}

// NAV MENU
hamburgerMenu.forEach((menu) => {
  menu.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.textContent === 'Home' || e.target.textContent === 'About') {
      homePageSection.classList.remove('active');
      servicesSection.classList.remove('active');
      foodListSection.classList.remove('active');
      allFoodElement.style.display = 'none';
      hamburgerMenuContainer.classList.remove('active');
      bodyHtml.style.overflow = '';
      hamburgerBtnToggle = !hamburgerBtnToggle;
      const link = document.getElementById(menu.getAttribute('class'));
      link.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      homePageSection.classList.add('active');
      servicesSection.classList.add('active');
      foodListSection.classList.add('active');
      allFoodElement.style.display = 'inline';
      const selectAllFoodElement = document.querySelector('all-food');
      const selectElementShadowDOM = selectAllFoodElement.shadowRoot.querySelector('.food-card-container');
      const filterElement = selectAllFoodElement.shadowRoot.querySelector('#food-categories');
      hamburgerMenuContainer.classList.remove('active');
      bodyHtml.style.overflow = '';
      hamburgerBtnToggle = !hamburgerBtnToggle;

      filterElement.addEventListener('change', (event) => {
        while (selectElementShadowDOM.firstChild) {
          selectElementShadowDOM.firstChild.remove();
        }
        showFilteredFood(event.target.value);
      });
    }
  });
});

menus.forEach((menu) => {
  menu.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.textContent === 'Home' || e.target.textContent === 'About') {
      homePageSection.classList.remove('active');
      servicesSection.classList.remove('active');
      foodListSection.classList.remove('active');
      allFoodElement.style.display = 'none';
    }

    const link = document.getElementById(menu.getAttribute('class'));
    link.scrollIntoView({
      behavior: 'smooth',
    });
  });
});

checkoutButton.addEventListener('click', () => {
  blurBg.classList.add('active');
  checkoutContent.classList.add('active');
  bodyHtml.style.overflow = 'hidden';
});

dropDownMenu.forEach((menu) => {
  menu.addEventListener('click', () => {
    homePageSection.classList.add('active');
    servicesSection.classList.add('active');
    foodListSection.classList.add('active');
    allFoodElement.style.display = 'inline';
    const selectAllFoodElement = document.querySelector('all-food');
    const selectElementShadowDOM = selectAllFoodElement.shadowRoot.querySelector('.food-card-container');
    const filterElement = selectAllFoodElement.shadowRoot.querySelector('#food-categories');
    while (selectElementShadowDOM.firstChild) {
      selectElementShadowDOM.firstChild.remove();
    }
    filterElement.value = menu.textContent;
    showFilteredFood(menu.textContent);

    filterElement.addEventListener('change', (e) => {
      while (selectElementShadowDOM.firstChild) {
        selectElementShadowDOM.firstChild.remove();
      }
      showFilteredFood(e.target.value);
    });
  });
});

// CONTINUE SHOPPING BUTTON
continueShopping.forEach((button) => {
  button.addEventListener('click', () => {
    blurBg.classList.remove('active');
    checkoutContent.classList.remove('active');
    foodDetails.classList.remove('active');
    bodyHtml.style.overflow = '';
    foodQuantity.textContent = '0';
    foodQuantityNumber = 0;
  });
});

// ADD TO CART FROM FOOD DETAIL CONTAINER
const addQuantityBtn = foodDetail.querySelector('.add');
const subtractQuantityBtn = foodDetail.querySelector('.subtract');
const addToCartBtn = foodDetail.querySelector('.add-to-cart-btn');

addQuantityBtn.addEventListener('click', () => {
  foodQuantityNumber += 1;
  foodQuantity.textContent = foodQuantityNumber;
});

subtractQuantityBtn.addEventListener('click', () => {
  if (foodQuantityNumber > 0) {
    foodQuantityNumber -= 1;
    foodQuantity.textContent = foodQuantityNumber;
  }
});

function checkSameFood(itemName) {
  return checkoutFoodListArray.some((food) => food.name === itemName);
}

// CHECKOUT DROPDOWN CONTAINER
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

// REFRESH CONTENT
function refreshItemDropDown() {
  while (cartItemContainer.firstChild) {
    cartItemContainer.removeChild(cartItemContainer.firstChild);
  }
}

function refreshItemCheckout() {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

// CHECKOUT ALL ITEM CONTAINER
function showAllItemInCheckout(newItem) {
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

  tableCheckoutImgElement.src = newItem.img;
  tableCheckoutFoodName.textContent = newItem.name;
  quantityDiv.textContent = newItem.quantity;

  let quantityCountNumber = Number(quantityDiv.textContent);
  let totalPriceInTable = quantityCountNumber * newItem.price;
  priceColumn.textContent = convertToRupiah(totalPriceInTable);

  function setQuantityAndPrice() {
    totalPriceInTable = quantityCountNumber * newItem.price;
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

addToCartBtn.addEventListener('click', () => {
  addToCart(foodImgSrc.src, foodName.textContent, foodQuantityNumber, Number(foodPrice.textContent.replace('.', '')));
});

// TO SEE ALL FOOD (FROM EXPLORE AND SEE ALL FOOD BUTTON)
allFoodListBtn.forEach((button) => {
  button.addEventListener('click', () => {
    homePageSection.classList.add('active');
    servicesSection.classList.add('active');
    foodListSection.classList.add('active');
    allFoodElement.style.display = 'inline';
    const selectAllFoodElement = document.querySelector('all-food');
    const selectElementShadowDOM = selectAllFoodElement.shadowRoot.querySelector('.food-card-container');
    const filterElement = selectAllFoodElement.shadowRoot.querySelector('#food-categories');

    filterElement.addEventListener('change', (e) => {
      while (selectElementShadowDOM.firstChild) {
        selectElementShadowDOM.firstChild.remove();
      }
      showFilteredFood(e.target.value);
    });
  });
});
