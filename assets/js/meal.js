document.addEventListener("DOMContentLoaded", () => {
  const searchMeal = getSearchMeal();
  buildMealHero(searchMeal);

  const { idMeal, strInstructions } = searchMeal;

  const ingredientWrapper = $(".meal-ingredients-list");
  const ingredientInstructions = $(".meal-instructions");

  const mealKeys = Object.keys(searchMeal);

  const mealIngredients = [];
  const mealValues = [];

  mealKeys.forEach((key) => {
    if (key.startsWith("strIngredient")) {
      mealIngredients.push(key);
    }
    if (key.startsWith("strMeasure")) {
      mealValues.push(key);
    }
  });

  mealIngredients.forEach((ingredient, index) => {
    if (searchMeal[ingredient] !== null && searchMeal[ingredient] !== "") {
      const ingredientEl = $("<div>").addClass("ingredient");
      const spanEl = $("<span>").addClass("circle");
      const spanTextEl = $("<span>").addClass("text");
      const ingredientVal = $("<span>").addClass("value");
      ingredientVal.text(searchMeal[mealValues[index + 1]]);

      spanTextEl.text(`${searchMeal[ingredient]}`);
      ingredientEl.append(spanEl);
      ingredientEl.append(spanTextEl);
      ingredientEl.append(ingredientVal);

      ingredientWrapper.append(ingredientEl);
    }
  });

  const instructionsEl = $("<p>").text(strInstructions);
  ingredientInstructions.append(instructionsEl);

  getMealId(idMeal);
});
