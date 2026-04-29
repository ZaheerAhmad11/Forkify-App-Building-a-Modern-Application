import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if(module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
   

    if (!id) return;
    recipeView.renderSpinner();

    // 1)Loading Recipe
    await model.loadRecipe(id);

    // 2)Render Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
     resultView.renderSpinner()

     //1) Get search Query
    const query = searchView.getQuery()
    if (!query) return;
    
    //2) load search result
    await model.loadSearchResults(query);

    //3) Render Results
    resultView.render(model.getSearchResultPage(6))
    
    //4) Render initail pagination buttons
    paginationView.render(model.state.search)

  } catch (err) {
    console.log(err);
  }
};


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult)
};
init();
