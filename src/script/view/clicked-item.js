const foodDetails = document.querySelector('.food-detail-content');
const foodImgSrc = foodDetails.querySelector('img');
const foodName = foodDetails.querySelector('h3');
const foodCategory = foodDetails.querySelector('p:nth-child(2)');
const foodPrice = foodDetails.querySelector('p:nth-child(3) > span');
const blurBg = document.querySelector('.blur-bg');
const bodyHtml = document.querySelector('body');

function clickedFood(item) {
  item.addEventListener('click', () => {
    const cardImgSrc = item.shadowRoot.querySelector('img');
    const nameElement = item.shadowRoot.querySelector('p:nth-child(1)');
    const categoryElement = item.shadowRoot.querySelector('p:nth-child(2)');
    const priceElement = item.shadowRoot.querySelector('p:nth-child(3) > span');
    foodImgSrc.src = cardImgSrc.src;
    foodName.textContent = nameElement.textContent;
    foodCategory.textContent = categoryElement.textContent;
    foodPrice.textContent = priceElement.textContent;
    blurBg.classList.add('active');
    foodDetails.classList.add('active');
    bodyHtml.style.overflow = 'hidden';
  });
}

export { clickedFood, foodDetails, blurBg, bodyHtml, foodImgSrc, foodName, foodPrice };
