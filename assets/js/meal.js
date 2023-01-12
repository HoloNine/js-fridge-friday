document.addEventListener("DOMContentLoaded", () => {
  const searchMeal = getSearchMeal();
  buildMealHero(searchMeal);

  const { idMeal } = searchMeal;

  const ingredientWrapper = $(".meal-ingredients-list");
  const mealKeys = Object.keys(searchMeal);

  const mealIngredients = [];

  mealKeys.forEach((key) => {
    if (key.startsWith("strIngredient")) {
      mealIngredients.push(key);
    }
  });

  console.log(mealIngredients);
});
