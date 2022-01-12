console.log("recipe");

const bestRecipe = async function () {
  try {
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes?search=best"
    );
    const data = await res.json();
    const recipes = data.data.recipes;
    ListRender(recipes, "best");
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
                <div class="txt_box">
                <p>${recipe.title}</p>
                </div>

                </a>
                </div>
                `;
              })
              .join("")}
        </div>
      </div>`;
  mainBox.insertAdjacentHTML("beforeend", buildList);
};

bestRecipe();

const itemBox = document.querySelector(".item_box");

const recipeDetail = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes${id}`
    );
    const data = await res.json();
    itemRender(data.data.recipe);
    // const recipes = data.data.recipes;
    // ListRender(recipes, "best");
  } catch (err) {
    alert(err);
  }
};

const itemRender = (data) => {
  console.log(data);
  const buildList = `
  
    <div class="img_box">
        <img
        src=${data.image_url}
        alt=""
        />
    </div>
    <div class="txt_box">
    <div class="top_box">
       <h2>${data.title}</h2>
       <div class="ico_box">
       <div class="ico">
       <img src="https://cdn.pixabay.com/photo/2013/07/13/10/29/icon-157350_960_720.png" class="ico_time" /> 
       <p>${data.cooking_time} min</p>
       </div>
       <div class="ico">
       <img src="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png" class="ico_people" /> 
       <p>
       ${data.servings} People
       </p>
       </div>
       <a href="javascript:;">Bookmarks</a>
        <a href=${data.source_url} class="go_info" target="_blank">More Info</a>
       </div>
       </div>
       <div class="ing_box">
       <p>Ingredients</p>
       <ul>
       ${data.ingredients
         .map((ing) => {
           console.log(ing);
           return `
          <li>${ing.quantity ? ing.quantity : ""} ${ing.unit} ${
             ing.description
           }</li>
          `;
         })
         .join("")}
         </ul>
      </div>
      </div>
      `;
  itemBox.insertAdjacentHTML("beforeend", buildList);
};

console.log(window.location.pathname, "hash");
if (window.location.pathname !== "/") {
  let id = window.location.pathname;
  //   console.log(id, "id");
  //   console.log(`https://forkify-api.herokuapp.com/api/v2/recipes${id}`);
  mainBox.remove();
  recipeDetail(id);
}
