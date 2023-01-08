import '../component/food-item.js';
import '../component/all-food.js';
import { clickedFood } from '../view/clicked-item.js';

const foodCardContainer = document.querySelector('.food-card-container');
const allFoodElement = document.createElement('all-food');

allFoodElement.style.display = 'none';

async function fetchPopularFood() {
  try {
    for (let i = 0; i < 10; i++) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const responseJson = await response.json();
      const createFoodItemElement = document.createElement('food-item');
      createFoodItemElement.food = responseJson.meals[0];
      foodCardContainer.appendChild(createFoodItemElement);
      clickedFood(createFoodItemElement);
    }
  } catch (message) {
    console.log(message);
  }
}

// ONLY SHOW 20 RANDOM FOOD FOR THIS PROJECT AND SOMETIMES IT WILL SHOWS THE SAME FOOD
// BECAUSE THIS API DOESN'T HAVE ALL FOOD FEATURE.
// ALSO I NEED TO USE LOADING TO WAIT 'FOR LOOP' TO FINISH SO I WON'T MESS UP THE FETCHING PROCESS
async function fetchAllFood() {
  try {
    const searchError = allFoodElement.shadowRoot.querySelector('.search-error');
    searchError.textContent = '';
    for (let i = 0; i < 20; i++) {
      const foodCardContainerShadowDOM = allFoodElement.shadowRoot.querySelector('.food-card-container');
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const responseJson = await response.json();
      const createFoodItemElement = document.createElement('food-item');
      createFoodItemElement.food = responseJson.meals[0];
      foodCardContainerShadowDOM.appendChild(createFoodItemElement);
      clickedFood(createFoodItemElement);
    }
  } catch (message) {
    console.log(message);
  }
}

async function fetchFoodByCategory(category) {
  try {
    const searchError = allFoodElement.shadowRoot.querySelector('.search-error');
    searchError.textContent = '';
    const foodCardContainerShadowDOM = allFoodElement.shadowRoot.querySelector('.food-card-container');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const responseJson = await response.json();
    responseJson.meals.forEach((meal) => {
      const createFoodItemElement = document.createElement('food-item');
      createFoodItemElement.category = category;
      createFoodItemElement.food = meal;
      foodCardContainerShadowDOM.appendChild(createFoodItemElement);
      clickedFood(createFoodItemElement);
    });
  } catch (message) {
    console.log(message);
  }
}

async function fetchFoodByName(name) {
  const searchError = allFoodElement.shadowRoot.querySelector('.search-error');

  try {
    searchError.textContent = '';
    const foodCardContainerShadowDOM = allFoodElement.shadowRoot.querySelector('.food-card-container');
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const responseJson = await response.json();
    responseJson.meals.forEach((meal) => {
      const createFoodItemElement = document.createElement('food-item');
      createFoodItemElement.food = meal;
      foodCardContainerShadowDOM.appendChild(createFoodItemElement);
      clickedFood(createFoodItemElement);
    });
  } catch (message) {
    searchError.textContent = 'Not Found';
  }
}

export { fetchPopularFood, fetchAllFood, fetchFoodByCategory, fetchFoodByName, allFoodElement };
