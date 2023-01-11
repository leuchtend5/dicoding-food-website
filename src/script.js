import Swal from 'sweetalert2';
import { fetchPopularFood, fetchAllFood, allFoodElement } from './script/data/data-source.js';
import { foodDetails, blurBg, bodyHtml, foodImgSrc, foodName, foodPrice } from './script/view/clicked-item.js';
import { showFilteredFood, loading } from './script/view/show-item.js';
import { addToCart } from './script/view/cart.js';
import { homePageSection, servicesSection, foodListSection } from './script/view/nav.js';
import './assets/styles/styles.css';
import logo from './assets/images/logo_1.png';
import search from './assets/images/icons8-search-30.png';
import serviceOne from './assets/images/service_logo_1.png';
import serviceTwo from './assets/images/service_logo_2_edited.png';
import serviceThree from './assets/images/service_logo_3_edited.png';
import serviceFour from './assets/images/service_logo_4_edited.png';
import github from './assets/images/github_logo.png';
import email from './assets/images/mail_logo_edited.png';

const mainElement = document.querySelector('main');
const checkoutButton = document.querySelector('.checkout');
const checkoutContent = document.querySelector('.checkout-content');
const continueShopping = document.querySelectorAll('.continue-shopping');
const foodDetail = document.querySelector('.food-detail');
const foodQuantity = foodDetail.querySelector('.quantity');
const allFoodListBtn = document.querySelectorAll('.all-food-list');
const logoImg = document.getElementById('logo');
const searchIcon = document.getElementById('search-icon');
const serviceLogoOne = document.getElementById('service-logo-one');
const serviceLogoTwo = document.getElementById('service-logo-two');
const serviceLogoThree = document.getElementById('service-logo-three');
const serviceLogoFour = document.getElementById('service-logo-four');
const githubIcon = document.getElementById('github-icon');
const emailIcon = document.getElementById('email-icon');
const proceedToCheckoutBtn = document.getElementById('proceed-to-checkout');
const logoBottom = document.getElementById('logo-bottom');
const addQuantityBtn = foodDetail.querySelector('.add');
const subtractQuantityBtn = foodDetail.querySelector('.subtract');
const addToCartBtn = foodDetail.querySelector('.add-to-cart-btn');

logoImg.src = logo;
logoBottom.src = logo;
searchIcon.src = search;
serviceLogoOne.src = serviceOne;
serviceLogoTwo.src = serviceTwo;
serviceLogoThree.src = serviceThree;
serviceLogoFour.src = serviceFour;
githubIcon.src = github;
emailIcon.src = email;

let foodQuantityNumber = Number(foodQuantity.textContent);

proceedToCheckoutBtn.addEventListener('click', () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Transactions Success',
    showConfirmButton: false,
    timer: 1500,
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  mainElement.appendChild(allFoodElement);
  loading.classList.add('active');
  blurBg.classList.add('active');
  fetchPopularFood();
  await fetchAllFood();
  loading.classList.remove('active');
  blurBg.classList.remove('active');
});

checkoutButton.addEventListener('click', () => {
  blurBg.classList.add('active');
  checkoutContent.classList.add('active');
  bodyHtml.style.overflow = 'hidden';
});

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
