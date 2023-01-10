const mealAPI = () => {
  const searchRecipeFormInput = $(".search-recipe-form-input");
  const searchRecipeFormButton = $(".search-recipe-form-button");

  // build the api url
  const buildApiUrl = (props) => {
    const { query, value } = props;

    const apiKey = 1;
    const rootUrl = `https://www.themealdb.com/api/json/v1/${apiKey}`;

    switch (query) {
      case "search":
        return `${rootUrl}/${query}.php?${query.at(0)}=${value}`;
        break;
      case "random":
        return `${rootUrl}/${query}.php`;
        break;
      case "ingredient":
        return `${rootUrl}/filter.php?${query.at(0)}=${value}`;
        break;
      case "lookup":
        return `${rootUrl}/filter.php?i=${value}`;
        break;
    }
  };

  /**
   * @description: get the meals based on one ingredient
   */
  const getMeal = (ingredient) => {
    const url = buildApiUrl({ query: "ingredient", value: ingredient });
    const method = "GET";

    $.ajax({ url, method }).then((response) => {
      const { meals } = response;
      console.log(meals[0].idMeal);
    });
  };

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
