const checkoutFoodListArray = [];
const tbody = document.querySelector('tbody');
const subTotal = document.querySelector('.subtotal');
const allItemPrice = document.querySelector('.total-all-item');
const cartCount = document.querySelector('.notif');
let totalQuantity = 0;
let totalPrice = 0;

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

function countTotal() {
  totalPrice = totalQuantity * 50000;
  subTotal.textContent = convertToRupiah(totalPrice);
  allItemPrice.textContent = subTotal.textContent;
}

// NAV MENU
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

const bodyHtml = document.querySelector('body');
const checkoutButton = document.querySelector('.checkout');
const blurBg = document.querySelector('.blur-bg');
const checkoutContent = document.querySelector('.checkout-content');

checkoutButton.addEventListener('click', () => {
  blurBg.classList.add('active');
  checkoutContent.classList.add('active');
  bodyHtml.style.overflow = 'hidden';
});

// CONTINUE SHOPPING
const continueShopping = document.querySelectorAll('.continue-shopping');
const foodDetails = document.querySelector('.food-detail-content');
const foodDetail = document.querySelector('.food-detail');
const foodQuantity = foodDetail.querySelector('.quantity');
let foodQuantityNumber = Number(foodQuantity.textContent);

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

// FOOD DETAIL WHEN CLICKED
const foodCard = document.querySelectorAll('.food-card');
const foodImgSrc = foodDetails.querySelector('img');
const foodName = foodDetails.querySelector('h3');
const foodCategory = foodDetails.querySelector('p:nth-child(2)');
const foodPrice = foodDetails.querySelector('p:nth-child(3) > span');

foodCard.forEach((card) => {
  card.addEventListener('click', () => {
    const cardImgSrc = card.querySelector('img');
    const nameElement = card.querySelector('p:nth-child(1)');
    const categoryElement = card.querySelector('p:nth-child(2)');
    const priceElement = card.querySelector('p:nth-child(3) > span');

    foodImgSrc.src = cardImgSrc.src;
    foodName.textContent = nameElement.textContent;
    foodCategory.textContent = categoryElement.textContent;
    foodPrice.textContent = priceElement.textContent;

    blurBg.classList.add('active');
    foodDetails.classList.add('active');
    bodyHtml.style.overflow = 'hidden';
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
const cartItemContainer = document.querySelector('.cart-item-container');
const cartQty = document.querySelector('.cart-qty > span');

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

  deleteBtn.textContent = 'x';
  createSubtractBtn.textContent = '-';
  createAddBtn.textContent = '+';

  tableCheckoutImgElement.src = newItem.img;
  tableCheckoutFoodName.textContent = newItem.name;
  quantityDiv.textContent = newItem.quantity;

  const checkoutTableRows = document.querySelectorAll('tbody > tr');

  checkoutTableRows.forEach((row) => {
    const quantityCount = row.querySelector('.quantity');
    const addBtn = row.querySelector('.add');
    const subtractBtn = row.querySelector('.subtract');
    const priceColumnEachRow = row.querySelector('.price');
    const foodNameEachRow = row.querySelector('.food-name');
    let quantityCountNumber = Number(quantityCount.textContent);
    let totalPriceInTable = quantityCountNumber * newItem.price;

    priceColumnEachRow.textContent = convertToRupiah(totalPriceInTable);

    function setQuantityAndPrice() {
      totalPriceInTable = quantityCountNumber * newItem.price;
      quantityCount.textContent = quantityCountNumber;
      priceColumnEachRow.textContent = convertToRupiah(totalPriceInTable);

      const findFood = checkoutFoodListArray.find((food) => food.name === foodNameEachRow.textContent);
      findFood.quantity = quantityCountNumber;
    }

    addBtn.addEventListener('click', () => {
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

    subtractBtn.addEventListener('click', () => {
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
