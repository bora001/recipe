const bestRecipe = async function (keyword) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${keyword}`
    );
    const data = await res.json();
    const recipes = data.data.recipes;
    ListRender(recipes, keyword);
  } catch (err) {
    alert(err);
  }
};

const recipeDetail = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes${id}`
    );
    const data = await res.json();
    itemRender(data.data.recipe);
  } catch (err) {
    alert(err);
  }
};

const mainBox = document.querySelector(".main_box");

const ListRender = (data, title) => {
  if (data.length == 0) {
    const emptyList = `
  <div class="empty_list">
  <div class="txt_box">
  <p>Sorry, we can not find "${title}",<br> Try search again!</p>
  <button><a href="/">Main Page</a></button>
  </div>
  <img src="https://cdn.pixabay.com/photo/2017/06/21/09/19/spoon-2426623_960_720.jpg"/>
  </div>
    `;
    mainBox.insertAdjacentHTML("beforeend", emptyList);
    return;
  }

  let htmlTitle = "";
  if (title == "best") {
    let newTitle = title.replace(title[0], title[0].toUpperCase());
    htmlTitle = `<h1>${newTitle} Recipe</h1>`;
  }
  const buildList = `
  <div class="card_list">
  ${htmlTitle}
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

const itemRender = (data) => {
  const buildList = `
    <div class="item_box">
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
      </div>
      `;
  clearMainBox();
  mainBox.insertAdjacentHTML("beforeend", buildList);
};

const clearMainBox = () => {
  while (mainBox.firstChild) {
    mainBox.removeChild(mainBox.lastChild);
  }
};

if (window.location.pathname !== "/" && !window.location.search) {
  let id = window.location.pathname;
  recipeDetail(id);
}

if (window.location.pathname == "/" && !window.location.search) {
  bestRecipe("best");
}
//search
if (window.location.search) {
  let keyword = window.location.search.split("=")[1];
  clearMainBox();
  bestRecipe(keyword);
}

//menu
const menuBtn = document.querySelectorAll(".kv_box .menu_box button");
menuBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let keyword = btn.innerText;
    clearMainBox();
    bestRecipe(keyword);
  });
});
