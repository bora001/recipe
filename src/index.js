console.log("recipe");

const bestRecipe = async function () {
  try {
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes?search=best"
    );
    const data = await res.json();
    const recipes = data.data.recipes;
    for (let recipe of recipes) {
      cardRender(recipe);
    }
  } catch (err) {
    alert(err);
  }
};

const cardList = document.querySelector(".card_list");
const cardRender = (data, title) => {
  const buildCard = `
      <div class="card_detail">

    <a href="${data.id}">
          <img
          src="${data.image_url}"
            alt="${data.title}"
          />
          <p>${data.title}</p>
        </a>
        </div>
    `;

  cardList.insertAdjacentHTML("afterbegin", buildCard);
};

bestRecipe();
