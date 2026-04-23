export const state = {
  recipe: {},
};
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
      // `https://forkify-api.jonas`.io/api/v2/recipes/664c8f193e7aa067e94e863d`,`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourcUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(err);
  }
};
