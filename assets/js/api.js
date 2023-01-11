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
var ingredList = []
$.ajax({
  method: 'GET',
  url: buildApiUrl({query:'lookup', value: 52850}) ,

  
     
},
).then (response=> {console.log(response); 
  const objectMeasure = response.meals[0];
  const measureList = Object.entries(objectMeasure)
  for(let i = 1; i <= 3; i++) {
    let key = '.strMeasure' + i;
    ingredList.push(objectMeasure[key]);
    // console.log(ingredList)
    console.log(measureList)
  }
  for (i=0; i<20;i++) {
  console.log(measureList[29+i][1])
  console.log(measureList[9+i][1])
  ingredList.push(measureList[29+i][1])
  ingredList.push(measureList[9+i][1])
  console.log(ingredList)
  }
  })




var query = '1 egg, 1 carrot, 1 spoon dijon mustard'
var totalCal = 0;
var totalSugar = 0;
var totalCarb = 0;
var totalChol = 0;
var totalSat = 0;
var totalFat = 0;
var totalFiber = 0;
var totalPot = 0;
var totalProtein = 0;
var totalSize = 0;
var totalSodium = 0;
$.ajax({
    method: 'GET',
    url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
    headers: { 'X-Api-Key': '6V6g3LwVQnMlDJmfDz23Mw==tbEtLG245HDEo7Cn' },
    contentType: 'application/json',
    success: function (result) {
        console.log(result);
        for (i = 0; i < result.items.length; i++) {
            totalCal += result.items[i].calories
            totalSugar += result.items[i].sugar_g;
            totalCarb += result.items[i].carbohydrates_total_g
            totalChol += result.items[i].cholesterol_mg
            totalSat += result.items[i].fat_saturated_g
            totalFat += result.items[i].fat_total_g
            totalFiber += result.items[i].fiber_g
            totalPot += result.items[i].potassium_mg
            totalProtein += result.items[i].protein_g
            totalSize += result.items[i].serving_size_g
            totalSodium += result.items[i].sodium_mg
}
        console.log("Calories: " + totalCal.toFixed(1) + "kcal")
        console.log("Sugar: " + totalSugar.toFixed(1) + "g");
        console.log("Carbohydrates: " + totalCarb.toFixed(1) + "g");
        console.log("Cholesterol: " + totalChol.toFixed(1) + "mg");
        console.log("Saturated Fat: " + totalSat.toFixed(1) + "g");
        console.log("Fat: " + totalFat.toFixed(1) + "g");
        console.log("Fibre: " + totalFiber.toFixed(1) + "g");
        console.log("Potassium: " + totalPot.toFixed(1) + "mg");
        console.log("Protein: " + totalProtein.toFixed(1) + "g");
        console.log("Serving Size: " + totalSize.toFixed(1) + "g");
        console.log("Sodium: " + totalSodium.toFixed(1) + "mg");
    },

    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    },




}
);

function getNutritionFacts(queryParam) {
  $.ajax({
    method: 'GET',
    url: 'https://api.calorieninjas.com/v1/nutrition?query=' + queryParam,
    headers: { 'X-Api-Key': '6V6g3LwVQnMlDJmfDz23Mw==tbEtLG245HDEo7Cn' },
    contentType: 'application/json',
    success: function (result) {
        console.log(result);
        for (i = 0; i < result.items.length; i++) {
            totalCal += result.items[i].calories
            totalSugar += result.items[i].sugar_g;
            totalCarb += result.items[i].carbohydrates_total_g
            totalChol += result.items[i].cholesterol_mg
            totalSat += result.items[i].fat_saturated_g
            totalFat += result.items[i].fat_total_g
            totalFiber += result.items[i].fiber_g
            totalPot += result.items[i].potassium_mg
            totalProtein += result.items[i].protein_g
            totalSize += result.items[i].serving_size_g
            totalSodium += result.items[i].sodium_mg
  }
        console.log("Calories: " + totalCal.toFixed(1) + "kcal")
        console.log("Sugar: " + totalSugar.toFixed(1) + "g");
        console.log("Carbohydrates: " + totalCarb.toFixed(1) + "g");
        console.log("Cholesterol: " + totalChol.toFixed(1) + "mg");
        console.log("Saturated Fat: " + totalSat.toFixed(1) + "g");
        console.log("Fat: " + totalFat.toFixed(1) + "g");
        console.log("Fibre: " + totalFiber.toFixed(1) + "g");
        console.log("Potassium: " + totalPot.toFixed(1) + "mg");
        console.log("Protein: " + totalProtein.toFixed(1) + "g");
        console.log("Serving Size: " + totalSize.toFixed(1) + "g");
        console.log("Sodium: " + totalSodium.toFixed(1) + "mg");
    },
  
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    },
  
  
  
  
  }
  );
  }
  getNutritionFacts(toString(ingredList)) 
