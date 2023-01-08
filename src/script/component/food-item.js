class FoodItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set food(food) {
    this._food = food;
    this.render();
  }

  set category(category) {
    this._category = category;
  }

  checkCategory(category) {
    if (category !== undefined) {
      return this._food.strCategory;
    }
    return this._category;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
      @keyframes animate-pop {
        from {
          opacity: 0;
          transform: scale(0.5);
        }

        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      * {
        margin: 0;
      }

      .food-card {
        display: flex;
        flex-direction: column;
        background-color: #f2f2f2;
        align-items: center;
        width: 250px;
        height: 400px;
        border-radius: 10px;
        gap: 20px;
        padding: 12px 12px;
        box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: 0.2s;
        animation: animate-pop 0.25s;
        font-family: content-font;
      }

      .food-card:hover {
        transform: scale(1.03);
        filter: brightness(95%);
      }

      .food-card > img {
        width: 100%;
        border-radius: 5px;
      }

      .food-description {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 7px;
      }

      .food-description > p:nth-child(1) {
        font-family: title-font;
        font-size: 1.2rem;
      }

      @media screen and (max-width: 680px) {
        .food-card {
          width: 220px;
          height: 380px;
        }
      }
      </style>

      <div class="food-card">
        <img src="${this._food.strMealThumb}" alt="" />
        <div class="food-description">
          <p>${this._food.strMeal}</p>
          <p>${this.checkCategory(this._food.strCategory)}</p>
          <p>Rp <span>50.000</span></p>
        </div>
      </div>
    `;
  }
}

customElements.define('food-item', FoodItem);
