const searchRecipeFormInput = $(".search-recipe-form-input");
const searchRecipeFormButton = $(".search-recipe-form-button");
const popularRecipesWrapper = $(".popular-recipes-wrapper");

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

const buildRandomMealHero = (props) => {
  const { idMeal, strMeal, strInstructions, strMealThumb } = props;

  const strInstructionsSubstring = strInstructions.substring(0, 240);

  const heroBackground = $(".hero-background");
  const heroTitle = $(".hero-title");
  const heroText = $(".hero-text");
  const heroButton = $(".hero-button");

  heroBackground.css({
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("${strMealThumb}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });

  heroTitle.text(strMeal);
  heroText.text(`${strInstructionsSubstring}...`);
  heroButton.attr("id", idMeal);
};

const buildRandomMealCard = (props) => {
  const { idMeal, strMeal, strInstructions, strMealThumb } = props;

  const strInstructionsSubstring = strInstructions.substring(0, 120);

  // Image
  const popularRecipeCard = $("<div>").addClass("popular-recipes-card");
  const popularRecipeImage = $("<div>").addClass("popular-recipe-card-image");
  const popularRecipeImageTag = $("<img>").attr("src", strMealThumb);

  const popularRecipeCardBody = $("<div>").addClass("popular-recipe-card-body");
  const popularRecipeCardTitle = $("<h5>")
    .addClass("popular-recipe-card-title")
    .text(strMeal);

  const popularRecipeCardDescription = $("<p>")
    .addClass("popular-recipe-card-description")
    .text(`${strInstructionsSubstring}...`);

  const popularRecipeButton = $("<button>")
    .addClass("button button-primary")
    .attr("id", idMeal)
    .text("See More");

  popularRecipeImage.append(popularRecipeImageTag);
  popularRecipeCard.append(popularRecipeImage);

  popularRecipeCardBody.append(popularRecipeCardTitle);
  popularRecipeCardBody.append(popularRecipeCardDescription);
  popularRecipeCardBody.append(popularRecipeButton);
  popularRecipeCard.append(popularRecipeCardBody);

  popularRecipesWrapper.append(popularRecipeCard);
};

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
