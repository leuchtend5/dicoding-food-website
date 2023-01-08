class AllFood extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
        }

        .all-food {
          margin-top: 80px;
          font-family: title-font;
          color: var(--brown-font-color);
          padding: var(--padding-content);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .all-food > h2 {
          font-size: 3rem;
        }

        .filter > label {
          font-size: 1rem;
          font-family: content-font;
          color: var(--brown-font-color);
        }

        .food-card-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        .search-error {
          font-family: content-font;
          font-size: 2.5rem;
        }

        @media screen and (max-width: 680px) {
          .food-card-container {
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          }

          .all-food {
            padding: 0px 10px;
          }
        }

        @media screen and (max-width: 590px) {
          .food-card-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
      </style>

      <section class="all-food">
        <h2>Our Food</h2>
        <div class="filter">
          <label for="filter-by"> Filter : </label>
          <select name="" id="food-categories">
            <option value="show-all" selected>Show All</option>
            <option value="Beef">Beef</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Chicken">Chicken</option>
            <option value="Dessert">Dessert</option>
            <option value="Goat">Goat</option>
            <option value="Lamb">Lamb</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Pasta">Pasta</option>
            <option value="Pork">Pork</option>
            <option value="Seafood">Seafood</option>
            <option value="Side">Side</option>
            <option value="Starter">Starter</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </div>
        <div class="food-card-container"></div>
        <div class="search-error"></div>
      </section>
    `;
  }
}

customElements.define('all-food', AllFood);
