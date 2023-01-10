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
      return `${rootUrl}/filter.php?i=${value}`;
      break;
    case "random":
      return `${rootUrl}/randomselection.php`;
      break;
  }
};
