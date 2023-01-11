import { fetchFoodByName, allFoodElement } from '../data/data-source.js';
import { bodyHtml } from './clicked-item.js';
import { showFilteredFood } from './show-item.js';

const searchField = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const homePageSection = document.querySelector('.homepage');
const servicesSection = document.querySelector('.services');
const foodListSection = document.querySelector('.food-list');
const menus = document.querySelectorAll('nav > li > a');
const hamburgerMenu = document.querySelectorAll('.hamburger-menu-container > a');
const hamburgerMenuContainer = document.querySelector('.hamburger-menu-container');
const hamburgerBtn = document.querySelector('.fa-bars');
const dropDownMenu = document.querySelectorAll('.link');

let hamburgerBtnToggle = true;

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

export { homePageSection, servicesSection, foodListSection };
