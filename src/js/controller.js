import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

//Add New Buttons
const renderCategoryButtons = function () {
  const parent = document.querySelector('.search-results');

  const markup = `
  <div class="category-js" 
       style="padding:10px; display:grid; grid-template-columns: repeat(2, 1fr); gap:10px;">
    
    <button class="btn category-btn"  style="width:100%; display:flex; justify-content:center; align-items:center;"data-query="pizza">Pizza</button>
    <button class="btn category-btn"  style="width:100%; display:flex; justify-content:center; align-items:center;"data-query="pasta">Pasta</button>
    <button class="btn category-btn"  style="width:100%; display:flex; justify-content:center; align-items:center;"data-query="burger">Burger</button>
    <button class="btn category-btn"  style="width:100%; display:flex; justify-content:center; align-items:center;"data-query="bbq">BBQ</button>
    
  </div>
`;

  parent.insertAdjacentHTML('afterbegin', markup);
};

const addCategoryHandler = function () {
  const parent = document.querySelector('.search-results');

  parent.addEventListener('click', async function (e) {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    const query = btn.dataset.query;

    try {
      resultsView.renderSpinner();

      await model.loadSearchResults(query);

      resultsView.render(model.getSearchResultsPage());
      paginationView.render(model.state.search);

      // optional: input field me bhi value show ho
      document.querySelector('.search__field').value = query;
    } catch (err) {
      console.log(err);
    }
  });
};

//Add New Buttons----
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // 👇 NEW
  renderCategoryButtons();
  addCategoryHandler();
};
init();
