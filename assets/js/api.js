const mealAPI = () => {
  const searchRecipeFormInput = $(".search-recipe-form-input");
  const searchRecipeFormButton = $(".search-recipe-form-button");

  const searchRecipeFormButtonHandler = (event) => {
    event.preventDefault();

    /**
     * store input value in a constant that can be used later in our handler function
     */
    const searchRecipeFormInputValue = searchRecipeFormInput.val();

    console.log({ searchRecipeFormInputValue });
  };

  searchRecipeFormButton.on("click", searchRecipeFormButtonHandler);
};
