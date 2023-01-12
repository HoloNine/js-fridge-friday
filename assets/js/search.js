document.addEventListener("DOMContentLoaded", () => {
  const searchMealsHistory = getSearchHistory();
  const method = "GET";

  searchMealsHistory.forEach((element, index) => {
    const { idMeal } = element;

    const url = buildApiUrl({ query: "lookup", value: idMeal });

    if (index < 6) {
      $.ajax(url, method).then((response) =>
        buildRandomMealCard(response.meals[0])
      );
    }
  });
});
