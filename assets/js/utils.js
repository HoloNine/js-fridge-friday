// If exists return searchHistory object from localStorage
const getSearchHistory = () => {
  const searchHistory = JSON.parse(localStorage.getItem("meals"));
  if (!searchHistory) {
    return;
  }
  return searchHistory;
};

// If exists return searchHistory object from localStorage
const getSearchMeal = () => {
  const searchHistory = JSON.parse(localStorage.getItem("meal"));
  if (!searchHistory) {
    return;
  }
  return searchHistory;
};

// Add items to localStorage
const setSearchHistory = (meals) => {
  return localStorage.setItem("meals", JSON.stringify(meals));
};

// Add items to localStorage
const setSearchMeal = (meal) => {
  return localStorage.setItem("meal", JSON.stringify(meal));
};

/**
 * @description build the api url
 * @param {*} props
 * @returns api url based on the props received
 */
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
      return `${rootUrl}/lookup.php?i=${value}`;
      break;
    case "random":
      return `${rootUrl}/randomselection.php`;
      break;
  }
};

/**
 * @description render the hero image, title and text
 */
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

/**
 * @description render a custom meal card
 */
const buildRandomMealCard = (props) => {
  const { idMeal, strMeal, strInstructions, strMealThumb } = props;
  const method = "GET";
  const url = buildApiUrl({ query: "lookup", value: idMeal });

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
    .addClass("button button-primary button-random-meals")
    .attr("id", idMeal)
    .text("See More");

  popularRecipeButton.on("click", (event) => {
    // event.preventDefault();
    $.ajax(url, method)
      .then((response) => setSearchMeal(response.meals[0]))
      .done(() => {
        window.location.href = "./meal.html";
      });
  });

  popularRecipeImage.append(popularRecipeImageTag);
  popularRecipeCard.append(popularRecipeImage);

  popularRecipeCardBody.append(popularRecipeCardTitle);
  popularRecipeCardBody.append(popularRecipeCardDescription);
  popularRecipeCardBody.append(popularRecipeButton);
  popularRecipeCard.append(popularRecipeCardBody);

  popularRecipesWrapper.append(popularRecipeCard);
};
