// nav menu
const menus = document.querySelectorAll('nav > li > a');

menus.forEach((menu) => {
  menu.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.getElementById(menu.getAttribute('class'));
    link.scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// show cart container
const bodyHtml = document.querySelector('body');
const checkoutButton = document.querySelector('.checkout');
const blurBg = document.querySelector('.blur-bg');
const checkoutContent = document.querySelector('.checkout-content');

checkoutButton.addEventListener('click', () => {
  blurBg.classList.add('active');
  checkoutContent.classList.add('active');
  bodyHtml.style.overflow = 'hidden';
});

// continue shopping function
const continueShopping = document.querySelectorAll('.continue-shopping');
const foodDetails = document.querySelector('.food-detail-content');

continueShopping.forEach((button) => {
  button.addEventListener('click', () => {
    blurBg.classList.remove('active');
    checkoutContent.classList.remove('active');
    foodDetails.classList.remove('active');
    bodyHtml.style.overflow = '';
  });
});

// food details when click
const foodCard = document.querySelectorAll('.food-card');
const foodImgSrc = foodDetails.querySelector('img');
const foodName = foodDetails.querySelector('h3');
const foodCategory = foodDetails.querySelector('p:nth-child(2)');
const foodPrice = foodDetails.querySelector('p:nth-child(3)');

foodCard.forEach((card) => {
  card.addEventListener('click', () => {
    const cardImgSrc = card.querySelector('img');
    const nameElement = card.querySelector('p:nth-child(1)');
    const categoryElement = card.querySelector('p:nth-child(2)');
    const priceElement = card.querySelector('p:nth-child(3) > span');

    foodImgSrc.src = cardImgSrc.src;
    foodName.textContent = nameElement.textContent;
    foodCategory.textContent = categoryElement.textContent;
    foodPrice.textContent = `Rp ${priceElement.textContent}`;

    blurBg.classList.add('active');
    foodDetails.classList.add('active');
    bodyHtml.style.overflow = 'hidden';
  });
});

// add to cart from food details container
const foodDetail = document.querySelector('.food-detail');
const foodQuantity = foodDetail.querySelector('.quantity');
let foodQuantityNumber = Number(foodQuantity.textContent);
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

// function to add item to checkout dropdown and checkout container
const cartItemContainer = document.querySelector('.cart-item-container');

function addToCart(img, name, quantity, price) {
  const divElement = document.createElement('div');
  const cartItemDiv = document.createElement('div');
  const itemImgDiv = document.createElement('div');
  const imgElement = document.createElement('img');
  const itemDescDiv = document.createElement('div');
  const itemNameDiv = document.createElement('div');
  const itemQtyDiv = document.createElement('div');
  const itemPriceDiv = document.createElement('div');
  const cartQty = document.querySelector('.cart-qty > span');

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

  imgElement.src = img;
  itemNameDiv.textContent = name;
  itemQtyDiv.textContent = `Qty ${quantity}`;
  itemPriceDiv.textContent = price;
  cartQty.textContent = quantity;
}

addToCartBtn.addEventListener('click', () => {
  if (foodQuantityNumber > 0) {
    addToCart(foodImgSrc.src, foodName.textContent, foodQuantityNumber, foodPrice.textContent);
  }
});

// cart icon count
const cartCount = document.querySelector('.notif');

const checkoutTableRows = document.querySelectorAll('tbody > tr');

checkoutTableRows.forEach((row) => {
  const quantityCount = row.querySelector('.quantity');
  const addBtn = row.querySelector('.add');
  const subtractBtn = row.querySelector('.subtract');
  let quantityCountNumber = Number(quantityCount.textContent);

  addBtn.addEventListener('click', () => {
    quantityCountNumber += 1;
    quantityCount.textContent = quantityCountNumber;
  });

  subtractBtn.addEventListener('click', () => {
    if (quantityCountNumber > 0) {
      quantityCountNumber -= 1;
      quantityCount.textContent = quantityCountNumber;
    }
  });
});
