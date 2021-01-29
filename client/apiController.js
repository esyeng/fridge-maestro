export const api = {
    baseUrl: `https://api.spoonacular.com/`,
    ingredientSearch: `https://api.spoonacular.com/food/ingredients/search`,
    recipeSearch: `GET https://api.spoonacular.com/recipes/complexSearch`,
    ingredientInfo: (id) =>
        `https://api.spoonacular.com/food/ingredients/${id}/information`,
    // recipeByIngredients: `https://api.spoonacular.com/recipes/findByIngredients`,
};

/*********** API CONTROLLER *******
 * Methods for converting HTML queries to simple json, probe api, and receive simple json
 *
 * todo: --
 * - In progress:
 *
 *  -- ensure reliability of apiController (test in postman)
 *  -- write a set of functions that synthesize form input into standardized json
 *  -- write JS listener to run input form => apiController method => DOMinsertion
 *
 * - Then:
 *
 *  -- Evaluate performance, refactor & clean as needed
 *  -- Create user login/acct suite
 *  -- Mealplanning tool
 *  -- Determine additional features to implement
 *
 */

export const apiController = {
    parseQuery: (data) => {
        let query = data.url;
        for (let param in data.params) {
            query +=
                encodeURIComponent(param) +
                '=' +
                encodeURIComponent(data.params[param]) +
                '&';
        }
        return query.slice(0, -1);
    },
    getIngredients: (paramStr) => {
        fetch(`${api.ingredientSearch}/${paramStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => console.error(e));
    },
    findRecipes: (paramStr) => {
        fetch(`${api.recipeSearch}/${paramStr}`)
            .then((response) => response.json())
            .then((json) => json)
            .catch((e) => console.error(e));
    },

    resolve: (promise) => {
        promise.then((result) => result);
    },
};
