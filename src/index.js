console.log("recipe");

const bestRecipe = async function () {
  try {
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes?search=best"
    );
    const data = await res.json();
    const recipes = data.data.recipes;
    ListRender(recipes, "best");
    // for (let recipe of recipes) {
    // //   cardRender(recipe,"best");
    // }
  } catch (err) {
    alert(err);
  }
};

const mainBox = document.querySelector(".main_box");

const ListRender = (data, title) => {
  let newTitle = title.replace(title[0], title[0].toUpperCase());
  console.log();
  const buildList = `
  <div class="card_list">
         <h1>${newTitle} Recipe</h1>
        <div class="card_box">
            ${data
              .reverse()
              .map((recipe) => {
                return `
              <div class="card_detail">
              <a href="${recipe.id}">
                <img
                src="${recipe.image_url}"
                alt="${recipe.title}"
                />
                <p>${recipe.title}</p>
                </a>
                </div>
                `;
              })
              .join("")}
        </div>
      </div>`;
  mainBox.insertAdjacentHTML("afterbegin", buildList);
};

// };

bestRecipe();
