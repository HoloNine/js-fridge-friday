document.addEventListener("DOMContentLoaded", () => {
  const searchMealsHistory = getSearchHistory();

  searchMealsHistory.forEach((element) => {
    const { idMeal } = element;

    const url = buildApiUrl({ query: "lookup", value: idMeal });
    const method = "GET";
    $.ajax(url, method).then((response) =>
      buildRandomMealCard(response.meals[0])
    );
  });
});
