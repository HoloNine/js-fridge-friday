const searchRecipeFormInput = $(".search-recipe-form-input");
const searchRecipeFormButton = $(".search-recipe-form-button");

/**
 * @description get the meals based on one ingredient
 */
const getMeal = (ingredient) => {
  const url = buildApiUrl({ query: "ingredient", value: ingredient });
  const method = "GET";

  $.ajax({ url, method }).then((response) => {
    const { meals } = response;
  });
};

const getRandomMeals = () => {};

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
