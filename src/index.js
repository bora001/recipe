//bookmark
let theBookmark = localStorage.getItem || [];
const validBookmark = (data) => {
  const bookmarkBtn = document.querySelector(
    ".item_box .txt_box .ico_box .btn_bookmark"
  );

  if (!bookmarkBtn.classList.contains("add_bookmark")) {
    console.log("not yet!");
    bookmarkBtn.classList.add("add_bookmark");

    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", data);
    } else {
      let currentBookmark = localStorage.getItem("bookmarks").split(",");
      if (currentBookmark.indexOf(data) == -1) {
        currentBookmark.push(data);
        localStorage.setItem("bookmarks", currentBookmark);
      }
    }
  } else {
    let currentBookmark = localStorage.getItem("bookmarks").split(",");

    if (currentBookmark.indexOf(data) !== -1) {
      console.log("already!");
      console.log(currentBookmark, "current bookmark");
      for (let number in currentBookmark) {
        if (currentBookmark[number] == data) {
          currentBookmark.splice(number, 1);
          localStorage.setItem("bookmarks", currentBookmark);
        }
      }
    }
    bookmarkBtn.classList.remove("add_bookmark");
  }
  clearBox(bookmarkBox);
  renderBookmark();
};

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
  //book mark

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
       <a href="javascript:;" class="btn_bookmark"onclick="(function(){validBookmark(window.location.pathname.split('/')[1]);})()">Bookmark<span>✅</span></a>
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
  // clearMainBox();
  clearBox(mainBox);
  mainBox.insertAdjacentHTML("beforeend", buildList);
};

// const clearMainBox = () => {
//   while (mainBox.firstChild) {
//     mainBox.removeChild(mainBox.lastChild);
//   }
// };

const clearBox = (div) => {
  while (div.firstChild) {
    div.removeChild(div.lastChild);
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
  // clearMainBox();
  clearBox(mainBox);
  bestRecipe(keyword);
}

//menu
const menuBtn = document.querySelectorAll(".kv_box .menu_box button");
menuBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let keyword = btn.innerText;
    // clearMainBox();
    clearBox(mainBox);
    bestRecipe(keyword);
  });
});

//nav-bookmark
const navBookmark = document.querySelector(".nav .btn_box .nav_bookmark");
const bookmarkBox = document.querySelector(".bookmark_box .bookmark_item_box");

//render-show-bookmark
const renderBookmark = async function () {
  let bookmarkList;

  if (localStorage.getItem("bookmarks")) {
    localStorage.getItem("bookmarks").split(",") === "null"
      ? (bookmarkList = localStorage.getItem("bookmarks"))
      : (bookmarkList = localStorage.getItem("bookmarks").split(","));

    for (let eachItem of bookmarkList) {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${eachItem}`
        );
        const data = await res.json();
        const recipe = data.data.recipe;
        const bookmarkItem = `
          <div class="bookmark_item">
            <a href=${recipe.id}>
            <div class="img_box">
              <img
              src=${recipe.image_url}
                alt=""
              />
            </div>
              <p>${recipe.title}</p>
            </a>
          </div>
      `;
        bookmarkBox.insertAdjacentHTML("beforeend", bookmarkItem);
      } catch (err) {
        alert(err);
      }
    }
  } else {
    const bookmarkItem = `
    <div class="no_item">
      <p>There is no bookmark!</p>
     </div>
          `;
    bookmarkBox.insertAdjacentHTML("beforeend", bookmarkItem);
  }
};

renderBookmark();

const bookmarkE = () => {
  let bookmarkOpen = false;
  navBookmark.addEventListener("mouseover", () => {
    if (!bookmarkOpen) {
      bookmarkBox.classList.remove("off");
      console.log("mouseover on bookmark!!");

      bookmarkOpen = true;
    }
  });

  bookmarkBox.addEventListener("mouseleave", () => {
    console.log("mouseleave on bookmark!!");

    bookmarkBox.classList.add("off");
    bookmarkOpen = false;
  });
};

bookmarkE();
