document.addEventListener("DOMContentLoaded", () => {
  const searchMeal = getSearchMeal();
  buildMealHero(searchMeal);

  const { idMeal, strInstructions } = searchMeal;

  const ingredientWrapper = $(".meal-ingredients-list");
  const ingredientInstructions = $(".meal-instructions");

  const mealKeys = Object.keys(searchMeal);

  const mealIngredients = [];

  mealKeys.forEach((key) => {
    if (key.startsWith("strIngredient")) {
      mealIngredients.push(key);
    }
  });

  mealIngredients.forEach((ingredient) => {
    if (searchMeal[ingredient] !== null || searchMeal[ingredient] === "") {
      console.log(searchMeal[ingredient]);
      const ingredientEl = $("<div>").addClass("ingredient");
      const spanEl = $("<span>").addClass("circle");
      const spanTextEl = $("<span>").addClass("text");
      spanTextEl.text(`${searchMeal[ingredient]}`);
      ingredientEl.append(spanEl);
      ingredientEl.append(spanTextEl);
      ingredientWrapper.append(ingredientEl);
    }
  });

  const instructionsEl = $("<p>").text(strInstructions);
  ingredientInstructions.append(instructionsEl);

  getMealId(idMeal);
});
