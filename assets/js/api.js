const searchRecipeFormInput = $(".search-recipe-form-input");
const searchRecipeFormButton = $(".search-recipe-form-button");
const popularRecipesWrapper = $(".popular-recipes-wrapper");

/**
 * @description get the meals based on one ingredient
 */
const getMeal = (ingredient) => {
  const url = buildApiUrl({ query: "ingredient", value: ingredient });
  const method = "GET";
  const success = (response) => {
    if (response.meals) {
      window.location.href = "./search.html";
    }
  };

  $.ajax({ url, method, success }).then((response) => {
    const { meals } = response;
  });
};

/**
 * @description get random meals from the api, render the popular items and the hero
 */
const getRandomMeals = (numberOfMeals) => {
  const url = buildApiUrl({ query: "random", value: null });
  const method = "GET";

  const recentRecipeCount = Array.from(
    { length: numberOfMeals },
    (value, index) => index
  );

  if (!numberOfMeals) {
    $.ajax({ url, method }).then((response) => {
      const { meals } = response;
      buildRandomMealHero(...meals);
    });
  } else {
    recentRecipeCount.forEach(() => {
      $.ajax({ url, method }).then((response) => {
        const { meals } = response;
        buildRandomMealCard(...meals);
      });
    });
  }
};

const mealAPI = () => {
  /**
   * @description search recipe form button handler
   */
  const searchRecipeFormButtonHandler = (event) => {
    event.preventDefault();

    // store input value in a constant that can be used later in our callback function
    const ingredient = searchRecipeFormInput.val();
    if (!ingredient) return;

    // if the input form element returns a value then the function getMeal will be executed
    getMeal(ingredient);
  };

  searchRecipeFormButton.on("click", searchRecipeFormButtonHandler);
};
